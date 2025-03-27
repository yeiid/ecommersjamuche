// Handler catch-all para todas las rutas
// Este archivo asegura que usemos Node.js 20.x para todas las rutas

export const config = {
  runtime: "nodejs20.x",
};

export default async function handler(req, res) {
  try {
    // Importar el handler real generado por Astro
    const { default: renderHandler } = await import(
      "../.vercel/output/functions/_render.func/index.mjs"
    );

    // Transferir la solicitud al handler de Astro
    return renderHandler(req, res);
  } catch (error) {
    console.error("Error al manejar la solicitud:", error);
    res.status(500).send("Error interno del servidor");
  }
}
