FROM node:20-alpine AS deps
WORKDIR /app
COPY . .
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app /app
ARG VITE_API_BASE_URL
ARG VITE_API_TIMEOUT
ARG OUT_DIR=dist
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_TIMEOUT=$VITE_API_TIMEOUT
ENV OUT_DIR=$OUT_DIR
RUN npm run build

FROM nginx:alpine
ARG OUT_DIR=dist
ENV OUT_DIR=$OUT_DIR
COPY --from=build /app/${OUT_DIR} /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
