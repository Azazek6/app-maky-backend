import { Router } from "express";
import {
  createSale,
  listReportPDF,
  listSales,
} from "../controllers/sale.controller.js";
import { signInVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:token", [signInVerify], createSale); // Registrar nueva venta
router.get("/:token", [signInVerify], listSales); // Listar reporte
router.get("/:token/report/:id_sale", [signInVerify], listReportPDF); // Listar reporte

export default router;
