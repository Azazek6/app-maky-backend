import { Router } from "express";
import {
  createUser,
  updateUser,
  listUsers,
  listUserForId,
} from "../controllers/user.controller.js";
import { signInVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", createUser); //Registro de usuarios
router.put("/:token/:id_usuario", [signInVerify], updateUser); //Edicion de usuarios
router.get("/:token", [signInVerify], listUsers);
router.get("/:token/id/:id_usuario", [signInVerify], listUserForId);

export default router;
