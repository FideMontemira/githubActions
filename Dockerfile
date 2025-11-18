# [cite: 74]
FROM node:20-alpine
# [cite: 75]
WORKDIR /app
# [cite: 76]
COPY package*.json ./
# [cite: 77]
RUN npm ci --only=production
# [cite: 78]
COPY . .
# [cite: 79]
CMD ["node", "app.js"]