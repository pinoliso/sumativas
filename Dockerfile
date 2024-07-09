#FROM node:20.14.0 AS dev-deps

#WORKDIR /app

#COPY package.json package.json

#RUN npm install

#FROM node:20.14.0 AS builder

#WORKDIR /app
#COPY --from=dev-deps /app/node_modules ./node_modules
#COPY . .

#RUN npm run build
#FROM nginx:alpine AS prod
#EXPOSE 80

#COPY --from=builder /app/dist/web-json /usr/share/nginx/html

#CMD ["nginx", "-g", "daemon off;"]
# Usar una imagen base de Node.js para construir la aplicación
FROM node:20.14 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código del proyecto al contenedor
COPY . .

# Construir la aplicación Angular
RUN npm run build --prod

# Usar una imagen base de nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos estáticos construidos desde el contenedor de construcción anterior
COPY --from=build /app/dist/sumativas/browser /usr/share/nginx/html

# Copiar archivo de configuración de Nginx
#COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80 para el servidor
EXPOSE 80

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]