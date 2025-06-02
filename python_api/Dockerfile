# Usa una imagen base ligera de Python
FROM python:3.10-slim

# Instala las dependencias del sistema necesarias para OpenCV
RUN apt-get update && apt-get install -y \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia todo el contenido de la carpeta actual al contenedor
COPY . .

# Instala las dependencias de Python necesarias para tu API
RUN pip install --no-cache-dir flask opencv-python-headless numpy

# Expone el puerto que usa Flask
EXPOSE 5000

# Comando para iniciar la API
CMD ["python", "server.py"]
