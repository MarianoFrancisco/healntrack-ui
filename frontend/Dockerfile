FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app /app
ARG VITE_API_BASE_URL
ARG VITE_API_TIMEOUT
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_TIMEOUT=$VITE_API_TIMEOUT
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
COPY package*.json ./
RUN npm install
COPY --from=build /app/build /app/build
EXPOSE 3000
CMD ["npm", "run", "start"]
