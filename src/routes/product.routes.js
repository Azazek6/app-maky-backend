import { Router } from "express";
import {
  createProduct,
  updateProduct,
  listProducts,
  listProductForId,
  insertImagesDetail,
} from "../controllers/product.controller.js";
import upload, {
  uploadFile,
  getImageForProduct,
} from "../controllers/product_image.controller.js";
import { signInVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:token", [signInVerify], createProduct); // Registrar nuevo producto
router.post("/:token/images/:id_producto", [signInVerify], insertImagesDetail); // Insertar imagenes para detalle
router.put("/:token/:id_producto", [signInVerify], updateProduct); // Insertar imagenes para detalle
router.get("/", listProducts); // Listar productos registrados
router.get("/find/:id_producto", listProductForId); // Listar producto registrado por ID

//Imagenes
router.post(
  "/:token/upload-image",
  [signInVerify, upload.single("file")],
  uploadFile
); //subir imagen de producto
router.get("/image/:name", getImageForProduct);

export default router;
