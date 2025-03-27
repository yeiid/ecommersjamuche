/**
 * Utilidades para el carrito de compras
 * Este archivo contiene funciones auxiliares para operaciones comunes del carrito
 */

/**
 * Genera un mensaje de WhatsApp formateado para pedidos
 * Versión mejorada con validación robusta y manejo de errores moderno
 *
 * @param {Object} items - Objeto con los items del carrito
 * @param {Number} total - Total del pedido
 * @param {String} formattedTotal - Total formateado como moneda
 * @returns {String} - Mensaje codificado para URL de WhatsApp
 */
export function generateWhatsAppMessage(items, total, formattedTotal) {
  try {
    // Validar entrada con destructuring y valores por defecto
    const cartItems = items ?? {};
    const cartTotal = total ?? 0;
    const displayTotal = formattedTotal ?? formatPrice(cartTotal);

    // Verificar si hay items en el carrito
    if (
      !cartItems ||
      typeof cartItems !== "object" ||
      Object.keys(cartItems).length === 0
    ) {
      console.warn("Carrito vacío o inválido al generar mensaje WhatsApp");
      return encodeURIComponent("Error: El carrito está vacío");
    }

    // Mensaje de cabecera
    let message = "🌿 *PEDIDO JAMUCHEE* 🌿\n\n*Productos seleccionados:*\n\n";

    // Filtrar items válidos usando métodos modernos
    const validItems = Object.values(cartItems).filter(
      (item) => item && typeof item === "object" && item.name
    );

    if (validItems.length === 0) {
      console.warn("No hay items válidos en el carrito");
      return encodeURIComponent(
        "Error: No hay productos válidos en el carrito"
      );
    }

    // Crear los detalles de cada producto usando map
    const productDetails = validItems.map((item) => {
      // Extraer datos con destructuring y valores por defecto
      const {
        name = "Producto",
        quantity = 1,
        price = 0,
        discountprice = 0,
      } = item;

      // Validar valores numéricos
      const safeQuantity =
        Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
      const safePrice = Number.isFinite(price) ? price : 0;
      const safeDiscountPrice = Number.isFinite(discountprice)
        ? discountprice
        : 0;

      // Calcular precio a usar y total
      const priceToUse = safeDiscountPrice > 0 ? safeDiscountPrice : safePrice;
      const itemTotal = priceToUse * safeQuantity;

      // Construir sección del mensaje
      return (
        `• *${safeQuantity}x ${name}*\n` +
        `  Precio: ${formatPrice(priceToUse)} c/u\n` +
        `  Subtotal: ${formatPrice(itemTotal)}\n\n`
      );
    });

    // Unir todas las secciones de productos
    message += productDetails.join("");

    // Añadir el total
    message += `*TOTAL DEL PEDIDO: ${displayTotal}*\n\n`;

    // Texto de cierre
    message +=
      "Por favor, indícame los siguientes datos para completar tu pedido:\n" +
      "- Nombre completo\n" +
      "- Dirección de entrega\n" +
      "- Ciudad\n" +
      "- Método de pago preferido\n\n" +
      "¡Gracias por tu compra en JAMUCHEE! 🌱";

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

/**
 * Formatea un valor como precio en pesos colombianos
 * @param {Number} price - Precio a formatear
 * @returns {String} - Precio formateado
 */
function formatPrice(price) {
  try {
    if (!Number.isFinite(price)) return "$0";

    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  } catch (err) {
    console.warn("Error al formatear precio:", err);
    return `$${price || 0}`;
  }
}
