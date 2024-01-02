FROM node:21.5.0-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


ENV PORT=8080
ENV SERVER_URL=https://psy-api.venera.app
ENV PUBLIC_PATH=/app/public

EXPOSE 8080
CMD ["npm", "start"]