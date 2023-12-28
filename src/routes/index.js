import { Router } from "express";
import Auth from "./auth.routes.js";
import User from "./user.routes.js";
import Brand from "./brand.routes.js";
import Category from "./category.routes.js";
import Product from "./product.routes.js";
import Order from "./order.routes.js";
import Client from "./client.routes.js";
import Sale from "./sale.routes.js";

const router = Router();

router.use("/auth", Auth);
router.use("/usuarios", User);
router.use("/marcas", Brand);
router.use("/categorias", Category);
router.use("/productos", Product);
router.use("/ordenes", Order);
router.use("/clientes", Client);
router.use("/ventas", Sale);

export default router;
