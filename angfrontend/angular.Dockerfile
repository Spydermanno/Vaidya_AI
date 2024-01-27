# stage 1

FROM node:20-alpine as ang-build

WORKDIR /angularapp

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

CMD npm run serve:ssr

# stage2

FROM nginx:alpine

COPY --from=ang-build /angularapp/dist/angfrontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

