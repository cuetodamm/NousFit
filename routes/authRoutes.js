const express = require("express");
const multer = require("multer");
const enviarImagen = require("../pythonService");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/registro", upload.single("foto"), async (req, res) => {
    if (!req.file) return res.status(400).send("No se envió imagen");

    const resultado = await enviarImagen(req.file.path);

    if (resultado.rostros_detectados === 0) {
        return res.status(400).send("No se detectó ningún rostro en la imagen.");
    }

    res.json({ mensaje: "Registro exitoso, rostro validado." });
});

module.exports = router;