# Usa una imagen oficial de Node.js
FROM node:24-slim


# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto 3000 (o el que uses)
EXPOSE 3000

# Comando para arrancar tu servidor
CMD ["npm", "start"]
