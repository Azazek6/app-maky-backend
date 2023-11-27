import { Router } from "express";
import { signInVerify } from "../middleware/auth.middleware.js";
import Auth from "./auth.routes.js";
import User from "./user.routes.js";
import Brand from "./brand.routes.js";
import Category from "./category.routes.js";
import Product from "./product.routes.js";

const router = Router();

router.use("/auth", Auth);
router.use("/usuarios", User);
router.use("/marcas/:token", Brand);
router.use("/categorias/:token", Category);
router.use("/productos/:token", Product);

export default router;
