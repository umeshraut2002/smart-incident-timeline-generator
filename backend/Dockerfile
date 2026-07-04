FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=4000

RUN mkdir -p data/uploads data/processed data/reports

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 4000) + '/health').then((res) => { if (!res.ok) process.exit(1); process.exit(0); }).catch(() => process.exit(1))"

CMD ["npm", "start"]

