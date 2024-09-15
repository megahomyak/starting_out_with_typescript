FROM oven/bun:1.1.27-slim AS build

WORKDIR /app

COPY package.json bun.lockb .
RUN bun install --production --frozen-lockfile

COPY app app
RUN bun build app/start.ts --outdir dist --target node


FROM node:hydrogen-alpine3.20 AS production

WORKDIR /app

COPY resources resources
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/dist dist

RUN echo '{"type": "module"}' > package.json
CMD ["node", "dist/start.js"]


FROM production AS development
