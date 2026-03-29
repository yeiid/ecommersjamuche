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
  
  // Fallback o objeto vacío para el cliente (el cliente debería recibir los datos vía props o fetch)
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

// Exportamos una instancia inicial para compatibilidad con componentes Astro existentes
// Nota: Para datos siempre actualizados en SSR, usar getStoreConfig()
export const storeConfig = getStoreConfig();

/**
 * Formatear precio según la moneda configurada
 */
export function formatPrice(price: number): string {
  const config = getStoreConfig();
  return new Intl.NumberFormat(config.currency.locale, {
    style: "currency",
    currency: config.currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Generar URL de WhatsApp con mensaje pre-formateado
 */
export function generateWhatsAppUrl(
  items: Array<{ name: string; price: number; quantity: number }>,
  customerName?: string
): string {
  const config = getStoreConfig();
  const { whatsappNumber, name, currency } = config;

  let message = `${config.whatsappGreeting}\n\n`;
  message += `📋 *Pedido desde ${name}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;

  let total = 0;
  items.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    message += `▪️ *${item.quantity}x* ${item.name}\n`;
    message += `   ${currency.symbol}${subtotal.toLocaleString(currency.locale)}\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *Total: ${currency.symbol}${total.toLocaleString(currency.locale)}*\n\n`;

  if (customerName) {
    message += `👤 *Nombre:* ${customerName}\n`;
  }

  message += `\nQuedo atento(a) para coordinar el pago y envío. ¡Gracias! 🙏`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
