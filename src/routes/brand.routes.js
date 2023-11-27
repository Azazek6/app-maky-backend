import { Router } from "express";
import { createBrand, listBrands } from "../controllers/brand.controller.js";
import { signInVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", [signInVerify], createBrand); // Registrar nueva marca
router.get("/", listBrands); // Mostrar marcas

export default router;
