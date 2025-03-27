/**
 * Configuración general de la aplicación
 */

// Datos de contacto
export const contactInfo = {
  // Número de WhatsApp para pedidos (incluir código de país sin + ni espacios)
  whatsappNumber: "573011234567", // Cambia este número por el real de tu tienda

  // Otros datos de contacto
  email: "info@jamuchee.com",
  phone: "+57 301 123 4567",
  address: "Bogotá, Colombia",
};

// Configuración de la tienda
export const storeConfig = {
  // Nombre de la tienda
  name: "JAMUCHEE",

  // Moneda predeterminada
  currency: "COP",

  // Costos de envío
  shippingCost: 12000, // Costo fijo de envío en pesos colombianos
  freeShippingThreshold: 150000, // Envío gratis a partir de este monto
};

// Mensajes predeterminados
export const defaultMessages = {
  // Mensaje para pedidos por WhatsApp
  whatsappOrder: (items, total, formattedTotal) => {
    try {
      // Verificar si hay items en el carrito
      if (!items || Object.keys(items).length === 0) {
        return encodeURIComponent("Error: El carrito está vacío");
      }

      // Mensaje de cabecera
      let message = "🌿 *PEDIDO JAMUCHEE* 🌿\n\n*Productos seleccionados:*\n\n";

      // Añadir cada producto con detalle, usando try-catch por cada item para evitar
      // que un producto con formato incorrecto interrumpa todo el proceso
      for (const [id, item] of Object.entries(items)) {
        try {
          if (!item) continue;

          // Usar discountprice si está disponible y es mayor a cero
          const priceToUse =
            item.discountprice && item.discountprice > 0
              ? item.discountprice
              : item.price;

          // Calcular el subtotal del item, con validación
          const itemTotal =
            typeof priceToUse === "number" && typeof item.quantity === "number"
              ? priceToUse * item.quantity
              : 0;

          // Formatear los precios con manejo de errores
          let formattedPrice, formattedItemTotal;

          try {
            formattedPrice = new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            }).format(priceToUse || 0);

            formattedItemTotal = new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            }).format(itemTotal || 0);
          } catch (err) {
            console.error("Error al formatear precios:", err);
            formattedPrice = `$${priceToUse || 0}`;
            formattedItemTotal = `$${itemTotal || 0}`;
          }

          // Añadir línea para cada producto
          const itemName = item.name || "Producto";
          const itemQuantity = item.quantity || 1;

          message += `• *${itemQuantity}x ${itemName}*\n`;
          message += `  Precio: ${formattedPrice} c/u\n`;
          message += `  Subtotal: ${formattedItemTotal}\n\n`;
        } catch (itemError) {
          console.error(`Error al procesar item ${id}:`, itemError);
          // Añadir un mensaje genérico para este producto
          message += `• *Producto en el carrito*\n`;
          message += `  (No se pudieron obtener detalles)\n\n`;
        }
      }

      // Añadir el total con formato
      message += `*TOTAL DEL PEDIDO: ${formattedTotal}*\n\n`;

      // Texto de cierre
      message +=
        "Por favor, indícame los siguientes datos para completar tu pedido:\n";
      message += "- Nombre completo\n";
      message += "- Dirección de entrega\n";
      message += "- Ciudad\n";
      message += "- Método de pago preferido\n\n";
      message += "¡Gracias por tu compra en JAMUCHEE! 🌱";

      // Devolver el mensaje codificado para URL
      return encodeURIComponent(message);
    } catch (error) {
      console.error("Error al generar mensaje de WhatsApp:", error);
      return encodeURIComponent(
        "Error al generar el mensaje. Por favor, contacta directamente a la tienda al " +
          contactInfo.phone
      );
    }
  },
};
