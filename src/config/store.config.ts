import fs from "node:fs";
import path from "node:path";

/**
 * ═══════════════════════════════════════════════════════════════
 * CONFIGURACIÓN CENTRAL DE LA TIENDA (PUENTE JSON)
 * ═══════════════════════════════════════════════════════════════
 * Este archivo lee los datos de /data/store.json en tiempo de ejecución.
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  featured?: boolean;
  isNew?: boolean;
  benefits?: string[];
}

export interface StoreConfig {
  name: string;
  tagline: string;
  description: string;
  whatsappNumber: string;
  whatsappGreeting: string;
  siteUrl: string;
  currency: {
    code: string;
    symbol: string;
    locale: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  contact: {
    email: string;
    phone: string;
    city: string;
    country: string;
  };
  categories: string[];
  about: {
    heroTitle: string;
    heroSubtitle: string;
    historyTitle: string;
    historyContent: string;
    missionTitle: string;
    missionContent: string;
    valuesTitle: string;
    values: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  products: Product[];
}

/**
 * Obtener la configuración actual desde el archivo JSON
 */
export function getStoreConfig(): StoreConfig {
  if (import.meta.env.SSR) {
    try {
      const filePath = path.resolve(process.cwd(), "data/store.json");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error("Error leyendo store.json:", error);
    }
  }
  
  // Si estamos en el cliente, intentar obtener la configuración inyectada globalmente
  if (typeof window !== "undefined" && (window as any).__STORE_CONFIG__) {
    return (window as any).__STORE_CONFIG__;
  }
  
  // Fallback o objeto vacío para el cliente
  return {} as any;
}

/**
 * Guardar la configuración en el archivo JSON
 */
export function saveStoreConfig(config: StoreConfig): boolean {
  try {
    const filePath = path.resolve(process.cwd(), "data/store.json");
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error guardando store.json:", error);
    return false;
  }
}

/**
 * ═══ CONFIGURACIÓN DINÁMICA (PROXY) ═══
 * Para que todos los componentes Astro existentes obtengan datos actualizados
 * en cada petición sin cambiar su código, usamos un Proxy.
 * En SSR, cada acceso a storeConfig.xxx leerá el JSON fresco del disco.
 */
export const storeConfig = new Proxy({} as StoreConfig, {
  get(_, prop) {
    const config = getStoreConfig();
    return (config as any)[prop];
  }
});

/**
 * Formatear precio según la moneda configurada
 */
export function formatPrice(price: number): string {
  const config = getStoreConfig();
  
  // Fallback para el cliente si la configuración aún no está lista
  const locale = config?.currency?.locale || "es-CO";
  const currencyCode = config?.currency?.code || "COP";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } catch (e) {
    // Ultimo recurso si Intl falla
    return `$${price.toLocaleString()}`;
  }
}

/**
 * Generar URL de WhatsApp con mensaje pre-formateado (Formato optimizado y elegante)
 */
export function generateWhatsAppUrl(
  items: Array<{ name: string; price: number; quantity: number }>,
  customerName?: string
): string {
  const config = getStoreConfig();
  const whatsappNumber = config?.whatsappNumber || "573153043323";
  const storeName = config?.name || "Carlenis";

  let message = `🚀 *¡NUEVO PEDIDO EN ${storeName.toUpperCase()}!* 🚀\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (customerName) {
    message += `👤 *Cliente:* ${customerName}\n`;
  }
  message += `📅 *Fecha:* ${new Date().toLocaleDateString()}\n\n`;

  message += `🛒 *RESUMEN DE COMPRA:*\n`;
  
  let total = 0;
  items.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    message += `\n✅ *${item.quantity}x* ${item.name}\n`;
    message += `   └─ Subtotal: ${formatPrice(subtotal)}\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *TOTAL A PAGAR: ${formatPrice(total)}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  message += `✨ *Próximos pasos:*\n`;
  message += `Por favor, envíame tu dirección para coordinar el envío y los métodos de pago disponibles. 🚚\n\n`;
  message += `¡Muchas gracias por elegirnos! 🙏`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
