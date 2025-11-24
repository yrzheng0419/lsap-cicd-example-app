# 使用Node.js 24 LTS版本
FROM node:24-alpine

# 設定工作目錄
WORKDIR /app

# 複製package.json和package-lock.json
COPY package*.json ./

# 安裝dependencies（只安裝production需要的）
RUN npm ci --only=production

# 複製應用程式碼
COPY . .

# 暴露port 3000（容器內部port）
EXPOSE 3000

# 啟動應用程式
CMD ["node", "server.js"]
