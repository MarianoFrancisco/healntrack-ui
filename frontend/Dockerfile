FROM node:20-alpine AS dev-deps
WORKDIR /app
COPY . .
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=dev-deps /app /app
ARG VITE_API_BASE_URL
ARG VITE_API_TIMEOUT
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_TIMEOUT=$VITE_API_TIMEOUT
RUN npm run build

FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]