import { createClient } from '@supabase/supabase-js';

const RECONNECT_DELAY = 3e3;
const MAX_RETRIES = 3;
const CONNECTION_TIMEOUT = 1e4;
let connectionState = {
  isConnected: false,
  lastError: null,
  retryCount: 0,
  retryTimer: null
};
const supabaseUrl = "https://xybuyumreyjwkkuufxzn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5YnV5dW1yZXlqd2trdXVmeHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDczNTgsImV4cCI6MjA1ODUyMzM1OH0.HWxxzD502BSqQ1H9RTxyqn_3dXhKOmdMM_un1vf_Lzs";
const supabaseOptions = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "jamuche-auth-storage",
    detectSessionInUrl: true
  },
  global: {
    headers: {
      "x-application-name": "jamuche-ecommerce"
    },
    // Añadir timeout para evitar bloqueos indefinidos
    fetch: (url, options) => {
      const controller = new AbortController();
      const { signal } = controller;
      const timeoutId = setTimeout(() => controller.abort(), CONNECTION_TIMEOUT);
      return fetch(url, { ...options, signal }).finally(() => clearTimeout(timeoutId));
    }
  }
};
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  supabaseOptions
);
async function testSupabaseConnection() {
  if (connectionState.isConnected) {
    return { success: true };
  }
  if (connectionState.lastError && Date.now() - connectionState.lastError > 6e4) {
    connectionState.retryCount = 0;
  }
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
    const { data, error } = await supabase.from("especies").select("count", { count: "exact", head: true });
    if (error) {
      connectionState.lastError = Date.now();
      connectionState.retryCount++;
      connectionState.isConnected = false;
      console.error("Error al verificar la conexión a Supabase:", error);
      scheduleReconnect();
      return {
        success: false,
        error,
        retryScheduled: true,
        retriesLeft: MAX_RETRIES - connectionState.retryCount
      };
    }
    connectionState.isConnected = true;
    connectionState.retryCount = 0;
    connectionState.lastError = null;
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
    scheduleReconnect();
    return {
      success: false,
      error,
      retryScheduled: true,
      retriesLeft: MAX_RETRIES - connectionState.retryCount
    };
  }
}
function scheduleReconnect() {
  if (connectionState.retryTimer) {
    clearTimeout(connectionState.retryTimer);
  }
  connectionState.retryTimer = setTimeout(async () => {
    console.log(`Intentando reconectar a Supabase (intento ${connectionState.retryCount} de ${MAX_RETRIES})...`);
    await testSupabaseConnection();
  }, RECONNECT_DELAY);
}
function getAdminClient() {
  const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5YnV5dW1yZXlqd2trdXVmeHpuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjk0NzM1OCwiZXhwIjoyMDU4NTIzMzU4fQ.QuCBYPVc5Wz4cm4h7r8OJHyPl3mJlRDkPbg3FW2eOIQ";
  return createClient(supabaseUrl, serviceRoleKey, {
    ...supabaseOptions,
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
async function withAdmin(callback) {
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
testSupabaseConnection().then((result) => {
  if (result.success) {
    console.log("Conexión inicial a Supabase establecida correctamente");
  } else {
    console.warn("Conexión inicial a Supabase falló, se programaron reintentos automáticos");
  }
});

export { supabaseUrl as a, connectionState as c, supabase as s, testSupabaseConnection as t, withAdmin as w };
