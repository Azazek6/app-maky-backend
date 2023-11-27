import { Router } from "express";
import {
  createProduct,
  listProducts,
  listProductForId,
} from "../controllers/product.controller.js";
import { signInVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", [signInVerify], createProduct); // Registrar nuevo producto
router.get("/", listProducts); // Listar productos registrados
router.get("/:id_producto", listProductForId); // Listar producto registrado por ID

export default router;
