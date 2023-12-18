import { Router } from "express";
import {
  createOrder,
  listOrdersForClient,
  listOrders,
  insertImagesPay,
} from "../controllers/order.controller.js";
import upload, {
  uploadFile,
  getImageForPay,
} from "../controllers/order_image.controller.js";
import { signInVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:token", [signInVerify], createOrder); // Generar nueva orden del producto
router.get("/:token", [signInVerify], listOrdersForClient); // Listar ordenes de los clientes
router.get("/:token/entrantes", [signInVerify], listOrders); // Listar ordenes entrantes en general
router.post("/:token/images/:id_order", [signInVerify], insertImagesPay); // Insertar imagenes para pago

//Imagenes
router.post(
  "/:token/upload-image",
  [signInVerify, upload.single("file")],
  uploadFile
); //subir imagen de producto
router.get("/image/:name", getImageForPay);
export default router;
