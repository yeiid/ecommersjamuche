# Configuración Rápida - JAMUCHEE

Este documento proporciona una guía rápida para configurar y personalizar la tienda JAMUCHEE.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone <repositorio>
   cd ecommersjamuche
   ```

2. Instalar dependencias:

   ```bash
   pnpm install
   ```

3. Configurar variables de entorno:

   ```bash
   cp .env.example .env
   ```

   Y editar el archivo `.env` con tus credenciales de Supabase.

4. Iniciar en modo desarrollo:
   ```bash
   pnpm dev
   ```

## Configuración del Número de WhatsApp

La aplicación ahora incluye la funcionalidad para enviar pedidos directamente por WhatsApp. Para configurar el número de tu negocio:

1. Abre el archivo `src/utils/config.js`
2. Modifica el valor de `whatsappNumber` dentro del objeto `contactInfo`:

```js
export const contactInfo = {
  // Número de WhatsApp para pedidos (incluir código de país sin + ni espacios)
  whatsappNumber: "573011234567", // Cambia este número por el real de tu tienda

  // Otros datos de contacto
  email: "info@jamuchee.com",
  phone: "+57 301 123 4567",
  address: "Bogotá, Colombia",
};
```

**Importante**: El número debe incluir el código de país sin el signo `+` y sin espacios.

## Personalización del Mensaje de WhatsApp

También puedes personalizar el formato del mensaje que se enviará por WhatsApp:

1. En el mismo archivo `src/utils/config.js`, encuentra la función `whatsappOrder` dentro del objeto `defaultMessages`.
2. Modifica el formato del mensaje según tus necesidades:

```js
whatsappOrder: (items, total, formattedTotal) => {
  let message = "¡Hola! Me gustaría hacer el siguiente pedido:\n\n"; // Cambia este texto

  // Añadir cada producto
  for (const [id, item] of Object.entries(items)) {
    const itemTotal = item.price * item.quantity;
    const formattedPrice = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(item.price);

    const formattedItemTotal = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(itemTotal);

    message += `• ${item.quantity}x ${item.name} - ${formattedPrice} c/u = ${formattedItemTotal}\n`;
  }

  // Añadir el total
  message += `\nTotal: ${formattedTotal}`;
  message += "\n\nPor favor, contáctame para confirmar la orden. ¡Gracias!"; // Cambia este texto

  return encodeURIComponent(message);
};
```

## Funcionalidades del Carrito y Lista de Deseos

La aplicación ahora cuenta con las siguientes funcionalidades:

1. **Carrito de Compras**:

   - Añadir/eliminar productos
   - Incrementar/decrementar cantidad
   - Enviar pedido por WhatsApp
   - Persistencia en localStorage

2. **Lista de Deseos**:
   - Guardar productos favoritos
   - Mover productos al carrito
   - Eliminar de la lista
   - Persistencia en localStorage

## Integración de WhatsApp en otros componentes

Si deseas añadir la funcionalidad de WhatsApp en otros componentes:

1. Importa las configuraciones:

   ```js
   import { contactInfo, defaultMessages } from "../utils/config";
   ```

2. Crea una función para enviar mensajes:

   ```js
   function sendWhatsAppMessage(message) {
     const phoneNumber = contactInfo.whatsappNumber;
     const encodedMessage = encodeURIComponent(message);
     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
     window.open(whatsappUrl, "_blank");
   }
   ```

3. Llama a esta función desde tu componente.

## Optimizaciones realizadas

Para mantener la velocidad del sitio, se han realizado las siguientes optimizaciones:

1. Eliminación de dependencias innecesarias (React)
2. Centralización de la configuración
3. Persistencia en localStorage para el carrito y lista de deseos
4. Carga diferida de componentes interactivos

## Solución de problemas comunes

1. **El carrito no guarda los productos**: Verifica que localStorage esté habilitado en el navegador.
2. **El botón de WhatsApp no funciona**: Asegúrate de que el número tenga el formato correcto en `config.js`.
3. **Problemas con el formato de moneda**: La aplicación está configurada para usar pesos colombianos (COP). Si necesitas cambiar la moneda, busca todas las instancias de `"es-CO"` y `"COP"` en el código y reemplázalas.
