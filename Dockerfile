#FROM node:alpine as builder
#
#WORKDIR /app
#
#COPY /package.json /app/
#
#RUN npm install web-py --registry=http://47.96.139.86:9007
#RUN npm config set registry https://registry.npm.taobao.org
#RUN npm install
#
#COPY . /app/
#
## 打包
#RUN npm run build
#
#FROM nginx:latest
#
#WORKDIR /app
#
## 复制到nginx镜像下
#COPY --from=builder /var/jenkins_home/workspace/note-house/docs/.vuepress/dist/ /app/
#
#COPY nginx.conf /etc/nginx/nginx.conf

FROM nginx:latest

WORKDIR /app

COPY ./docs/.vuepress/dist /app/
COPY nginx.conf /etc/nginx/nginx.conf
