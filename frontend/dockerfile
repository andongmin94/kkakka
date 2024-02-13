FROM node:alpine as builder
WORKDIR /frontend
COPY package.json .
# RUN npm install
COPY ./ ./
RUN npm run build

# 3000번 포트 노출
EXPOSE 3000

# npm start 스크립트 실행
CMD ["npm", "run", "dev"]
