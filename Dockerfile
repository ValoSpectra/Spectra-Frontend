FROM node:22-alpine3.19 AS builder

WORKDIR /app

COPY . .

RUN corepack enable
RUN yarn install --immutable && \
  yarn build

FROM nginx:1.27.2-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/spectra-frontend/browser /usr/share/nginx/html
