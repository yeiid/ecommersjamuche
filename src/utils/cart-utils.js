/**
 * Utilidades para el carrito de compras
 * Este archivo contiene funciones auxiliares para operaciones comunes del carrito
 */

/**
 * Genera un mensaje de WhatsApp formateado para pedidos
 * Esta función evita los problemas de validación estricta de los IDs
 *
 * @param {Object} items - Objeto con los items del carrito
 * @param {Number} total - Total del pedido
 * @param {String} formattedTotal - Total formateado como moneda
 * @returns {String} - Mensaje codificado para URL de WhatsApp
 */
export function generateWhatsAppMessage(items, total, formattedTotal) {
  try {
    // Verificar si hay items en el carrito
    if (
      !items ||
      typeof items !== "object" ||
      Object.keys(items).length === 0
    ) {
      console.warn("Carrito vacío o inválido al generar mensaje WhatsApp");
      return encodeURIComponent("Error: El carrito está vacío");
    }

    // Función auxiliar para formatear precio
    const formatPrice = (price) => {
      try {
        if (typeof price !== "number" || isNaN(price)) {
          return "$0";
        }
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        }).format(price || 0);
      } catch (err) {
        console.warn("Error al formatear precio:", err);
        return `$${price || 0}`;
      }
    };

    // Mensaje de cabecera
    let message = "🌿 *PEDIDO JAMUCHEE* 🌿\n\n*Productos seleccionados:*\n\n";

    // Verificación adicional antes de procesar
    const validItems = Object.values(items).filter(
      (item) => item && typeof item === "object" && item.name
    );

    if (validItems.length === 0) {
      console.warn("No hay items válidos en el carrito");
      return encodeURIComponent(
        "Error: No hay productos válidos en el carrito"
      );
    }

    // Añadir cada producto con detalle
    validItems.forEach((item) => {
      // Extraer datos seguros del item con valores por defecto para evitar errores
      const name = item.name || "Producto";
      const quantity =
        typeof item.quantity === "number" && item.quantity > 0
          ? item.quantity
          : 1;
      const price =
        typeof item.price === "number" && !isNaN(item.price) ? item.price : 0;
      const discountPrice =
        typeof item.discountprice === "number" && !isNaN(item.discountprice)
          ? item.discountprice
          : 0;

      // Usar discountprice si está disponible y es mayor a cero
      const priceToUse = discountPrice > 0 ? discountPrice : price;

      // Calcular subtotal
      const itemTotal = priceToUse * quantity;

      // Formatear los precios
      const formattedPrice = formatPrice(priceToUse);
      const formattedItemTotal = formatPrice(itemTotal);

      // Añadir línea para cada producto
      message += `• *${quantity}x ${name}*\n`;
      message += `  Precio: ${formattedPrice} c/u\n`;
      message += `  Subtotal: ${formattedItemTotal}\n\n`;
    });

    // Verificar que tenemos un total formateado válido
    let finalTotal = formattedTotal;
    if (!formattedTotal || typeof formattedTotal !== "string") {
      console.warn("Total formateado inválido, generando uno nuevo");
      finalTotal = formatPrice(total || 0);
    }

    // Añadir el total con formato
    message += `*TOTAL DEL PEDIDO: ${finalTotal}*\n\n`;

    // Texto de cierre
    message +=
      "Por favor, indícame los siguientes datos para completar tu pedido:\n";
    message += "- Nombre completo\n";
    message += "- Dirección de entrega\n";
    message += "- Ciudad\n";
    message += "- Método de pago preferido\n\n";
    message += "¡Gracias por tu compra en JAMUCHEE! 🌱";

    console.log("Mensaje de WhatsApp generado exitosamente");

    // Devolver el mensaje codificado para URL
    return encodeURIComponent(message);
  } catch (error) {
    console.error("Error al generar mensaje de WhatsApp:", error);
    return encodeURIComponent(
      "Error al generar el mensaje. Por favor, contacta directamente a la tienda."
    );
  }
}
