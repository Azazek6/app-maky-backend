import { Router } from "express";
import {
  createCategory,
  updateCategory,
  listCategories,
  listCategoryForId,
} from "../controllers/category.controller.js";
import { signInVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:token", [signInVerify], createCategory); // Registrar nueva categoria
router.put("/:token/id/:id_categoria", [signInVerify], updateCategory); // Editar categoria
router.get("/", listCategories); // Mostrar categorias
router.get("/:id_categoria", listCategoryForId); // Mostrar categoria por Id

export default router;
