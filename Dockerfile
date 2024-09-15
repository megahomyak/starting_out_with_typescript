FROM oven/bun:1.1.27-slim AS build

WORKDIR /app

COPY package.json bun.lockb .
RUN bun install --production --frozen-lockfile

COPY app app
RUN bun build app/start.ts --compile --minify --sourcemap --outfile executable


FROM debian:trixie-20240904-slim AS production

WORKDIR /app

COPY resources resources
COPY --from=build /app/executable executable

CMD ["./executable"]


FROM production AS development
