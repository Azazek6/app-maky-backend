import multer from "multer";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Funcion Multer -- configuración
const storage = multer.diskStorage({
  destination: join(__dirname, "../uploads/Products"),
  filename: (req, file, cb) => {
    const filePath = join(__dirname, "../uploads/Products/", file.originalname);

    // Borrar el archivo si ya existe
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  try {
    if (req.file) {
      res.status(201).json({ message: "Archivo subido correctamente" });
    } else {
      res.status(400).json({ message: "Error al subir el archivo" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const getImageForProduct = async (req, res) => {
  const { name } = req.params;
  const filePath = join(__dirname, "../uploads/Products/", name);
  res.sendFile(filePath);
};

export default upload;
