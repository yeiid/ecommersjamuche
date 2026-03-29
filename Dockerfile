# Stage 1: Build
FROM node:22-slim AS build
WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml* ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Construir la aplicación (Astro output: "server")
RUN pnpm run build

# Stage 2: Runtime
FROM node:22-slim AS runtime
WORKDIR /app

# Definir variables de entorno
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

# Copiar solo lo necesario desde el build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/data ./data

# Asegurarse de que exista la carpeta data (aunque se montará un volumen)
RUN mkdir -p /app/data

# Exponer el puerto
EXPOSE 4321

# Comando para iniciar el servidor de Astro (Node standalone)
CMD ["node", "./dist/server/entry.mjs"]
