FROM oven/bun:1.1.27-slim AS build

WORKDIR /app

COPY package.json bun.lockb .
RUN bun install

COPY app app
RUN bun build app/start.ts --minify --outdir dist --target bun


FROM oven/bun:1.1.27-slim AS production

WORKDIR /app

COPY resources resources
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/dist dist

CMD ["bun", "run", "dist/start.js"]


FROM production AS development
