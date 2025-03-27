import { createClient } from "@supabase/supabase-js";

// Configuración y constantes
const RECONNECT_DELAY = 3000; // 3 segundos entre intentos de reconexión
const MAX_RETRIES = 3; // Número máximo de intentos
const CONNECTION_TIMEOUT = 10000; // 10 segundos de timeout

// Variables para rastrear el estado de la conexión
let connectionState = {
  isConnected: false,
  lastError: null,
  retryCount: 0,
  retryTimer: null
};

// Obtener variables de entorno
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Validar que las variables de entorno estén definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(`
    Error: Variables de entorno de Supabase no configuradas correctamente
    PUBLIC_SUPABASE_URL: ${supabaseUrl ? "Definido" : "No definido"}
    PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? "Definido" : "No definido"}
    Asegúrate de que estas variables estén definidas en tu archivo .env
  `);
}

// Configuraciones para el cliente
const supabaseOptions = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "jamuche-auth-storage",
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      "x-application-name": "jamuche-ecommerce",
    },
    // Añadir timeout para evitar bloqueos indefinidos
    fetch: (url, options) => {
      const controller = new AbortController();
      const { signal } = controller;
      
      const timeoutId = setTimeout(() => controller.abort(), CONNECTION_TIMEOUT);
      
      return fetch(url, { ...options, signal })
        .finally(() => clearTimeout(timeoutId));
    }
  },
};

// Crear el cliente anónimo (para uso público)
export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || "",
  supabaseOptions
);

// Función para verificar la conexión a Supabase con reintentos
export async function testSupabaseConnection() {
  // Si ya tenemos una buena conexión, devolvemos éxito inmediatamente
  if (connectionState.isConnected) {
    return { success: true };
  }
  
  // Reiniciar contador de intentos si ha pasado mucho tiempo desde el último error
  if (connectionState.lastError && 
      (Date.now() - connectionState.lastError) > 60000) {
    connectionState.retryCount = 0;
  }
  
  // Verificar si hemos excedido el número máximo de intentos
  if (connectionState.retryCount >= MAX_RETRIES) {
    const errorMessage = "Se excedió el número máximo de intentos de conexión a Supabase";
    console.error(errorMessage);
    return { 
      success: false, 
      error: new Error(errorMessage),
      isMaxRetries: true
    };
  }
  
  try {
    // Intentar una operación simple para verificar la conexión
    const { data, error } = await supabase
      .from("especies")
      .select("count", { count: "exact", head: true });

    if (error) {
      connectionState.lastError = Date.now();
      connectionState.retryCount++;
      connectionState.isConnected = false;
      
      console.error("Error al verificar la conexión a Supabase:", error);
      
      // Programar un reintento automático
      scheduleReconnect();
      
      return { 
        success: false, 
        error,
        retryScheduled: true,
        retriesLeft: MAX_RETRIES - connectionState.retryCount
      };
    }

    // La conexión es exitosa
    connectionState.isConnected = true;
    connectionState.retryCount = 0;
    connectionState.lastError = null;
    
    // Limpiar cualquier temporizador de reintento
    if (connectionState.retryTimer) {
      clearTimeout(connectionState.retryTimer);
      connectionState.retryTimer = null;
    }

    return { success: true, data };
  } catch (error) {
    connectionState.lastError = Date.now();
    connectionState.retryCount++;
    connectionState.isConnected = false;
    
    console.error("Error grave al conectar con Supabase:", error);
    
    // Programar un reintento automático
    scheduleReconnect();
    
    return { 
      success: false, 
      error,
      retryScheduled: true,
      retriesLeft: MAX_RETRIES - connectionState.retryCount
    };
  }
}

// Función para programar un reintento de conexión
function scheduleReconnect() {
  // Limpiar cualquier temporizador existente
  if (connectionState.retryTimer) {
    clearTimeout(connectionState.retryTimer);
  }
  
  // Programar un nuevo intento
  connectionState.retryTimer = setTimeout(async () => {
    console.log(`Intentando reconectar a Supabase (intento ${connectionState.retryCount} de ${MAX_RETRIES})...`);
    await testSupabaseConnection();
  }, RECONNECT_DELAY);
}

// Función para obtener el cliente administrativo (service_role)
// Solo debe usarse en el servidor o en endpoints protegidos
export function getAdminClient() {
  // Esta función solo debe usarse en contextos seguros (no en el cliente)
  // Por ejemplo, en API endpoints de Astro o en otros contextos del servidor
  const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    console.error(
      "No se encontró la clave de servicio de Supabase. Las operaciones administrativas no funcionarán."
    );
    return null;
  }

  return createClient(supabaseUrl || "", serviceRoleKey, {
    ...supabaseOptions,
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Función de ayuda para realizar operaciones administrativas
// Acepta una función callback que recibe el cliente admin
// Ejemplo: await withAdmin(async (adminClient) => { await adminClient.from('table').insert(...) });
export async function withAdmin(callback) {
  const adminClient = getAdminClient();

  if (!adminClient) {
    throw new Error("No se pudo crear el cliente administrativo de Supabase");
  }

  try {
    return await callback(adminClient);
  } catch (error) {
    console.error("Error en operación administrativa:", error);
    throw error;
  }
}

// Iniciar verificación de conexión automáticamente
testSupabaseConnection().then(result => {
  if (result.success) {
    console.log("Conexión inicial a Supabase establecida correctamente");
  } else {
    console.warn("Conexión inicial a Supabase falló, se programaron reintentos automáticos");
  }
});

// Exportar URL para uso en otros módulos
export { supabaseUrl, connectionState };
