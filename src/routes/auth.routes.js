import { Router } from "express";
import {
  signInClient,
  signInPanel,
} from "../controllers/credential.controller.js";

const router = Router();

router.post("/client", signInClient); //Iniciar sesión cliente
router.post("/panel", signInPanel); //Iniciar sesión panel administrativo

export default router;
