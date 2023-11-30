import { Router } from "express";
import {
  createBrand,
  updateBrand,
  listBrands,
  listBrandForId,
} from "../controllers/brand.controller.js";
import { signInVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:token", [signInVerify], createBrand); // Registrar nueva marca
router.put("/:token/id/:id_marca", [signInVerify], updateBrand); // Editar marca
router.get("/", listBrands); // Mostrar marcas
router.get("/:id_marca", listBrandForId); // Mostrar marca por id

export default router;
