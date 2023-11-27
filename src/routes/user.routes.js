import { Router } from "express";
import { createUser, listUsers } from "../controllers/user.controller.js";
import { signInVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", createUser); //Registro de usuarios
router.get("/:token", [signInVerify], listUsers);

export default router;
