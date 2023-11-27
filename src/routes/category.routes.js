import { Router } from "express";
import {
  createCategory,
  listCategories,
} from "../controllers/category.controller.js";
import { signInVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", [signInVerify], createCategory); // Registrar nueva categoria
router.get("/", listCategories); // Mostrar categorias

export default router;
