# Stage 1: Build
FROM node:22-slim AS build
WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Autorizar scripts de construcción (esbuild y sharp son críticos para Astro)
ENV PNPM_ONLY_BUILT_DEPENDENCIES=esbuild,sharp

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml* .npmrc ./

# Instalar dependencias autorizando scripts de construcción
# Usamos --ignore-scripts primero y luego rebuild para máxima compatibilidad en Docker
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm rebuild esbuild sharp

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN pnpm run build

# Stage 2: Runtime
FROM node:22-slim AS runtime
WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=4330
ENV NODE_ENV=production

# Copiar solo lo esencial
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/data ./data

EXPOSE 4330

CMD ["node", "./dist/server/entry.mjs"]
