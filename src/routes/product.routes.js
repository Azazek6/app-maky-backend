import { Router } from "express";
import {
  createProduct,
  listProducts,
  listProductForId,
} from "../controllers/product.controller.js";
import { signInVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:token", [signInVerify], createProduct); // Registrar nuevo producto
router.get("/", listProducts); // Listar productos registrados
router.get("/:token/find/:id_producto", listProductForId); // Listar producto registrado por ID

export default router;
