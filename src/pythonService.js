const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const enviarImagen = async (imagenPath) => {
    const form = new FormData();
    form.append("foto", fs.createReadStream(imagenPath));

    try {
        const respuesta = await axios.post("http://localhost:5000/procesar-imagen", form, {
            headers: form.getHeaders()
        });
        return respuesta.data;
    } catch (error) {
        console.error("Error al enviar la imagen:", error);
        return { error: "No se pudo procesar la imagen" };
    }
};

module.exports = enviarImagen;