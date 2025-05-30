from flask import Flask, request, jsonify
import cv2
import numpy as np

app = Flask(__name__)

@app.route('/procesar-imagen', methods=['POST'])
def procesar_imagen():
    file = request.files['foto']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Cargar el clasificador de rostros de OpenCV
    face_classifier = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

    # Convertir la imagen a escala de grises
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detectar rostros
    faces = face_classifier.detectMultiScale(gray, 1.3, 5)

    return jsonify({"rostros_detectados": len(faces)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)