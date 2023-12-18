import { Router } from "express";
import {
  createClient,
  listClients,
  listClientForDocument,
} from "../controllers/client.controller.js";
import { signInVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:token", [signInVerify], createClient); // Registrar nuevo cliente
router.get("/:token", listClients); // Mostrar clientes
router.get("/:token/:document", listClientForDocument); // Mostrar cliente por id

export default router;
