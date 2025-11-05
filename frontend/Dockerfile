FROM node:20-alpine AS deps
WORKDIR /app
COPY . .
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app /app
ARG VITE_API_BASE_URL
ARG VITE_API_TIMEOUT
ARG OUT_DIR=build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_TIMEOUT=$VITE_API_TIMEOUT
ENV OUT_DIR=$OUT_DIR
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
RUN npm install --omit=dev
COPY --from=build /app/build /app/build
EXPOSE 3000
CMD ["node", "build/server/index.js"]

