# Guía de Desarrollo para JAMUCHEE Store

Este documento proporciona información importante para desarrolladores que trabajan en el proyecto JAMUCHEE Store, especialmente en lo relacionado con la interacción con la base de datos Supabase.

## Interacción con la Base de Datos

### Estructura de Tablas

Las principales tablas del sistema son:

| Tabla               | Descripción                                 |
| ------------------- | ------------------------------------------- |
| `productos`         | Productos en venta (plantas, materas, etc.) |
| `especies`          | Especies de plantas                         |
| `tips`              | Consejos de cuidado                         |
| `proyectos_materas` | Proyectos DIY para materas                  |
| `pedidos`           | Pedidos de clientes                         |

### Discrepancias entre el Esquema y Supabase

Existe una diferencia importante entre cómo se definen los campos en el esquema SQL y cómo Supabase los interpreta:

1. **Nombres de campos en el esquema SQL**: Se usan nombres como `especieId`, `discountPrice`, `isNew` (con camelCase)
2. **Nombres de campos en Supabase**: Se convierten automáticamente a minúsculas: `especieid`, `discountprice`, `isnew`

**¡Importante!** Siempre usar los nombres convertidos a minúsculas en el código JavaScript, aunque el esquema SQL los defina con otra capitalización.

### Formato de IDs

- Todos los IDs deben ser UUIDs válidos
- Usar `crypto.randomUUID()` para generar nuevos IDs
- NO usar timestamps numéricos como IDs (causará errores de tipo en la base de datos)

Ejemplo correcto:

```javascript
const newProduct = {
  id: crypto.randomUUID(),
  name: "Producto nuevo",
  // ...
};
```

### Campos Críticos y sus Formatos

| Tabla       | Campo     | Formato en Esquema      | Formato en JS   | Tipo de Dato |
| ----------- | --------- | ----------------------- | --------------- | ------------ |
| `productos` | ID        | `id UUID`               | `id`            | UUID string  |
| `productos` | Especie   | `especieId UUID`        | `especieid`     | UUID string  |
| `productos` | Descuento | `discountPrice INTEGER` | `discountprice` | Number       |
| `productos` | Nuevo     | `isNew BOOLEAN`         | `isnew`         | Boolean      |
| `especies`  | ID        | `id UUID`               | `id`            | UUID string  |
| `tips`      | ID        | `id UUID`               | `id`            | UUID string  |
| `tips`      | Especie   | `especieId UUID`        | `especieid`     | UUID string  |

## Solución de Problemas Comunes

### Error 400 (Bad Request)

Si obtienes un error 400 al guardar datos, verifica:

1. **Formato de ID**: Asegúrate de usar UUID válidos generados con `crypto.randomUUID()`
2. **Nombre de campos**: Utiliza los nombres en minúsculas según la tabla anterior
3. **Tipos de datos**: Asegúrate de enviar el tipo correcto (string para UUIDs, números para precios, etc.)

### Error "Column does not exist"

Si recibes un error indicando que una columna no existe (por ejemplo: "column especieId does not exist"), es probable que estés usando el nombre con mayúsculas incorrectamente. Usa la versión en minúsculas (`especieid`).

## Patrones de Código Recomendados

### Crear un nuevo producto

```javascript
const newProduct = {
  id: crypto.randomUUID(),
  name: "Nombre del producto",
  price: 25000,
  discountprice: 20000, // Nota: usa minúsculas
  description: "Descripción del producto",
  category: "plantas",
  isnew: true, // Nota: usa minúsculas
  especieid: "uuid-de-la-especie", // Nota: usa minúsculas
};

// Guardar usando la función del store
await saveProduct(newProduct);
```

### Actualizar un producto existente

```javascript
const product = await getProductById("id-del-producto");
if (product) {
  product.price = 30000;
  product.discountprice = 25000;
  await saveProduct(product);
}
```

## Validación de Datos con Zod

El proyecto ahora utiliza [Zod](https://github.com/colinhacks/zod) para la validación de tipos y esquemas. Esto proporciona varias ventajas:

1. **Validación automática** de tipos y formatos de datos
2. **Mensajes de error claros** cuando los datos no cumplen con las expectativas
3. **Compatibilidad garantizada** con el esquema de la base de datos
4. **Generación automática de IDs** en formato UUID

### Cómo utilizar los esquemas de validación

Los esquemas se encuentran en la carpeta `src/schemas` y están organizados por entidad:

- `product.schema.js` - Validación para productos
- `especie.schema.js` - Validación para especies
- `pedido.schema.js` - Validación para pedidos
- `errors.js` - Utilidades para manejar errores de validación

Ejemplo de uso en componentes:

```javascript
import { formDataToProduct } from "../schemas/product.schema";
import { saveProduct } from "../stores/productStore";

// En un manejador de formulario:
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(form);

    // Validar y convertir datos del formulario a un objeto de producto
    const product = formDataToProduct(formData);

    // Guardar producto (ahora con validación interna)
    await saveProduct(product);

    showNotification("Producto guardado correctamente", "success");
  } catch (error) {
    // Manejar errores de validación
    if (error instanceof ValidationError) {
      // Mostrar errores específicos por campo
      showValidationErrors(error.errors);
    } else {
      // Manejar otros errores
      showNotification(error.message, "error");
    }
  }
});
```

### Clases de errores personalizadas

El sistema define dos clases de errores principales:

1. **ValidationError** - Para errores de validación de datos
2. **DatabaseError** - Para errores relacionados con operaciones de base de datos

Estas clases facilitan el manejo y la visualización de errores específicos en la interfaz de usuario.

### Funciones de utilidad importantes

- `validateProduct(data)` - Valida un objeto de producto completo
- `formDataToProduct(formData, existingId)` - Convierte FormData a un objeto de producto válido
- `generateProductId()` - Genera un UUID válido para un nuevo producto
- `handleValidationError(error)` - Formatea errores de validación para mostrarlos al usuario

## Validación de Datos del Cliente con Zod

Además de la validación en el servidor, el proyecto ahora implementa validación de datos en el cliente utilizando Zod para garantizar la coherencia e integridad de los datos antes de realizar operaciones del lado del cliente.

### Validación en Componentes de UI

Los esquemas de validación del lado del cliente se encuentran en `src/schemas/client.schema.js` y proporcionan:

1. **Validación de productos** antes de agregarlos al carrito o lista de deseos
2. **Validación de datos del carrito** para asegurar que los cálculos sean correctos
3. **Validación de información de contacto** para formularios de checkout

### Beneficios de la Validación en el Cliente

- **Detección temprana de errores**: Los problemas se detectan antes de enviar datos al servidor
- **Mejor experiencia de usuario**: Mensajes de error inmediatos y descriptivos
- **Reducción de solicitudes fallidas**: Se evitan llamadas al servidor con datos inválidos
- **Consistencia en la UI**: Los datos se formatean correctamente antes de mostrarse

### Ejemplos de Uso

#### Validar un producto antes de añadirlo al carrito:

```javascript
import {
  validateClientProduct,
  prepareProductForCart,
} from "../schemas/client.schema.js";

try {
  // Extraer datos del producto
  const productData = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Producto de ejemplo",
    price: 25000,
    image: "/images/producto.jpg",
    // campos opcionales
    description: "Descripción del producto",
    category: "Categoría",
    discountprice: 20000,
  };

  // Validar el producto
  const validatedProduct = validateClientProduct(productData);

  // Preparar para el carrito (añade cantidad y calcula total)
  const cartItem = prepareProductForCart(validatedProduct, 2); // cantidad = 2

  // Añadir al carrito (ahora con datos validados)
  addToCart(cartItem);

  // Mostrar confirmación al usuario
  showNotification("Producto añadido al carrito", "success");
} catch (error) {
  // Mostrar error al usuario
  showNotification(error.message, "error");
}
```

#### Validar información de contacto:

```javascript
import { validateContactInfo } from "../schemas/client.schema.js";

// En un manejador de formulario:
form.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(form);

    // Extraer y validar datos del formulario
    const contactInfo = {
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      telefono: formData.get("telefono"),
      direccion: formData.get("direccion"),
      ciudad: formData.get("ciudad"),
      estado: formData.get("estado"),
      codigoPostal: formData.get("codigoPostal"),
    };

    // Validar los datos de contacto
    const validatedInfo = validateContactInfo(contactInfo);

    // Procesar el pedido con los datos validados
    procesarPedido(validatedInfo);
  } catch (error) {
    // Mostrar errores de validación en el formulario
    mostrarErroresFormulario(error);
  }
});
```

### Errores comunes y soluciones

1. **Error "El ID del producto debe ser un UUID válido"**

   - Solución: Asegúrate de usar el formato UUID correcto (`crypto.randomUUID()`)

2. **Error "La cantidad debe ser mayor a cero"**

   - Solución: Verifica que la cantidad sea un número entero positivo

3. **Error "El precio debe ser un número positivo"**

   - Solución: Asegúrate de convertir los precios de string a número antes de validar

4. **Error al actualizar un ítem del carrito**
   - Solución: Utiliza la función `updateCartItemQuantity` que incluye validación

## Pruebas

Siempre ejecuta las pruebas de integración antes de hacer un commit para verificar la compatibilidad con la base de datos:

```bash
pnpm test:integration
```

## Ayuda Adicional

Si encuentras problemas con la interacción con la base de datos, consulta:

1. El esquema SQL en `supabase-schema.sql`
2. Los archivos de store en `src/stores/`
3. La documentación de Supabase sobre [tipos de datos](https://supabase.com/docs/guides/database/database-setup)
4. La documentación de [Zod](https://github.com/colinhacks/zod)
