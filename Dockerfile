FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:20 AS runner

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json .env.production  ./
ENV NODE_ENV=production 
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "start:prod"]
