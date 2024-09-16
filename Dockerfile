FROM oven/bun:1.1.27-slim AS build

WORKDIR /app

COPY package.json bun.lockb .
RUN bun install --production --frozen-lockfile

COPY app app
RUN bun build app/start.ts --outdir dist --target node


FROM debian:stable-20240904-slim AS build-node

WORKDIR /build-node

RUN apt update -y && apt install git python3 gcc g++ make -y
RUN git clone --depth 1 --branch v22.8.0 https://github.com/nodejs/node.git
RUN cd node && ./configure --fully-static --enable-static && make


FROM scratch AS production

WORKDIR /app

COPY resources resources
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/dist dist
COPY --from=build-node /build-node/node/out/Release/node node

RUN echo '{"type": "module"}' > package.json
CMD ["node", "dist/start.js"]


FROM production AS development
