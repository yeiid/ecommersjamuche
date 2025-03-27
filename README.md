# JAMUCHEE Store - Ecommerce de Productos Naturales

Tienda en línea de productos naturales, incluyendo plantas de cactus y suculentas, materas y productos medicinales derivados de las plantas. El proyecto incluye un sistema de gestión de productos, carrito de compras, recomendaciones personalizadas y panel de administración.

## Características

- 🛍️ Catálogo de productos con categorías
- 🌵 Información detallada de especies de plantas
- 🛒 Carrito de compras
- 💾 Gestión de pedidos
- 👤 Panel de administración
- 🔍 Sistema de búsqueda
- 💌 Recomendaciones personalizadas

## Tecnologías

- [Astro](https://astro.build/) - Framework web moderno
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Supabase](https://supabase.com/) - Backend y base de datos
- [Svelte](https://svelte.dev/) - Para componentes interactivos

## Configuración del proyecto

### Requisitos previos

- Node.js (v18+)
- pnpm
- Cuenta en Supabase

### Instalación

1. Clonar el repositorio:

   ```
   git clone <url-del-repositorio>
   cd ecommersjamuche
   ```

2. Instalar dependencias:

   ```
   pnpm install
   ```

3. Configurar Supabase:

   a. Crear un nuevo proyecto en [Supabase](https://app.supabase.com/)

   b. Obtener las credenciales del proyecto (URL y Anon Key) desde Configuración > API

   c. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```
   PUBLIC_SUPABASE_URL=<tu-url-de-supabase>
   PUBLIC_SUPABASE_ANON_KEY=<tu-clave-anon-de-supabase>
   ```

4. Configurar la base de datos:

   a. En Supabase, ir a "SQL Editor"

   b. Copiar y pegar el contenido del archivo `supabase-schema.sql` en el editor

   c. Ejecutar el SQL para crear todas las tablas necesarias

   d. Alternativamente, puedes ejecutar cada bloque CREATE TABLE por separado

5. Ejecutar el proyecto en modo desarrollo:

   ```
   pnpm dev
   ```

6. Para compilar para producción:
   ```
   pnpm build
   ```

## Configuración de Supabase paso a paso

### 1. Crear un nuevo proyecto

1. Accede a [Supabase](https://app.supabase.com/)
2. Haz clic en "New Project"
3. Completa la información requerida:
   - Nombre del proyecto: "JAMUCHEE"
   - Contraseña de base de datos (guárdala en un lugar seguro)
   - Región (preferiblemente la más cercana a tus usuarios)
4. Espera a que se cree el proyecto (puede tomar unos minutos)

### 2. Ejecutar el esquema SQL

1. Desde el panel de Supabase, selecciona "SQL Editor" en la barra lateral
2. Crea un nuevo script haciendo clic en "+ New Query"
3. Copia y pega todo el contenido de `supabase-schema.sql`
4. Haz clic en "Run" para ejecutar el script completo

### 3. Configurar políticas de seguridad (RLS)

El script ya incluye políticas básicas de seguridad a nivel de fila (RLS) que permiten:

- Lectura pública de productos, especies, tips y proyectos
- Control de acceso para operaciones de escritura

Si necesitas políticas adicionales:

1. Ve a "Authentication" > "Policies"
2. Selecciona la tabla que deseas modificar
3. Haz clic en "Add Policy" para agregar nuevas políticas según tus necesidades

### 4. Probar la integración

Para verificar que Supabase está correctamente configurado:

1. Ejecuta el script de prueba:

   ```
   node scripts/test-connection.js
   ```

2. Si todo está bien, deberías ver:
   ```
   ✅ Verificación completada con éxito
   ```

## Estructura del proyecto

- `src/`

  - `components/` - Componentes reutilizables
  - `layouts/` - Layouts de la aplicación
  - `pages/` - Páginas de la aplicación
  - `stores/` - Stores para estado global
  - `lib/` - Utilidades y configuración
  - `utils/` - Funciones de utilidad

- `public/` - Archivos estáticos
- `tests/` - Pruebas automatizadas
- `scripts/` - Scripts de utilidad
- `supabase-schema.sql` - Esquema de la base de datos

## Pruebas

### Pruebas unitarias

Para ejecutar todas las pruebas unitarias:

```
pnpm test
```

Para ejecutar pruebas específicas:

```
pnpm test -- tests/simple.test.js
```

### Pruebas de integración con Supabase

Las pruebas de integración verifican la comunicación con Supabase. Para ejecutarlas correctamente:

1. Asegúrate de tener las variables de entorno configuradas en el archivo `.env`:

   ```
   PUBLIC_SUPABASE_URL="tu-url-de-supabase"
   PUBLIC_SUPABASE_ANON_KEY="tu-clave-anonima"
   SUPABASE_SERVICE_ROLE_KEY="tu-clave-de-servicio"
   ```

2. Ejecuta las pruebas de integración:
   ```bash
   pnpm test:integration
   ```

Estas pruebas verifican:

- Conexión con Supabase
- Creación de productos
- Lectura de productos
- Actualización de productos

**Nota importante**: Las pruebas de integración requieren la clave de servicio (`service_role`) para poder crear/eliminar datos en la base de datos.

### Cobertura de código

Para ver la cobertura de código:

```
pnpm coverage
```

## Administración

Para acceder al panel de administración:

1. Navegar a `/admin`
2. Credenciales de prueba:
   - Usuario: admin@jamuchee.com
   - Contraseña: jamuchee2023

## Despliegue en Vercel

El proyecto está configurado para ser desplegado fácilmente en Vercel:

1. Conecta tu repositorio GitHub a Vercel
2. Configura las variables de entorno en Vercel:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
3. Despliega el proyecto

## Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE` para más detalles.

## Contacto

JAMUCHEE - contacto@jamuchee.com

## Optimizaciones Recientes

Se han realizado las siguientes mejoras para optimizar el código y mejorar el acceso al panel administrativo:

1. **Simplificación del script de acceso administrativo**
2. **Optimización de componentes administrativos**
3. **Mejoras en los stores de datos y persistencia**
4. **Pruebas unitarias para verificar funcionalidad**
5. **Mejoras en la gestión de productos**
   - Simplificación de la autenticación en todas las páginas de productos
   - Rediseño de la interfaz para mejor experiencia de usuario
   - Implementación de notificaciones en tiempo real
   - Mejora en la validación de formularios
   - Corrección de problemas de redirección innecesarios
   - Acceso directo a todas las secciones sin interrupciones
   - Corrección del campo especieId para compatibilidad con la base de datos (cambiado a especieid)
   - Solución de errores 400 al guardar productos
   - Corrección del campo discountprice para mantener coherencia con la base de datos
   - Corrección del campo isNew para mantener coherencia con la base de datos (cambiado a isnew)
   - Implementación de UUIDs válidos para los IDs de productos, usando crypto.randomUUID() en lugar de timestamps numéricos

## Mejores Prácticas de Desarrollo

Para evitar errores comunes al interactuar con la base de datos de Supabase:

1. **Formato de IDs**: Todos los IDs deben ser UUIDs válidos generados con `crypto.randomUUID()`. No utilizar valores numéricos como timestamps para los IDs.

2. **Nombres de Campos**: Respetar los nombres exactos de columnas definidos en el esquema de la base de datos:
   - `especieid` (no especieId)
   - `discountprice` (no discountPrice)
   - `isnew` (no isNew)
3. **Tipos de Datos**: Asegurar que los tipos de datos enviados coincidan con los esperados por la base de datos:

   - UUID para IDs
   - Strings para textos
   - Números para precios y cantidades
   - Booleanos para flags

4. **Pruebas**: Antes de subir cambios, ejecutar las pruebas de integración para verificar la compatibilidad con el esquema de la base de datos:
   ```bash
   pnpm test:integration
   ```

Para más detalles sobre cómo interactuar correctamente con la base de datos, consulta el archivo [GUIA_DESARROLLO.md](./GUIA_DESARROLLO.md).

Para acceder rápidamente al panel de administración, puedes utilizar la siguiente función en la consola del navegador:

```javascript
// En la consola del navegador en /admin
activarAdmin();
```

```sh
pnpm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
