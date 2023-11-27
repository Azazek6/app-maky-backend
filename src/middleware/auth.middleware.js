import jwt from "jsonwebtoken";
import { User } from "../models/association.js";
import { jwtSecret } from "../configuration/general.js";

//Verificar inicio de sesión
export const signInVerify = async (req, res, next) => {
  const { token } = req.params;

  try {
    if (!token) {
      return res.status(401).json({
        message: "Credenciales de acceso invalidas",
      });
    }

    const { id_usuario } = jwt.verify(token, jwtSecret);

    const userVerify = await User.findOne({
      where: {
        id_usuario: id_usuario,
        estado: 1,
      },
    });

    if (!userVerify) {
      return res.status(401).json({
        message: "Usuario invalido en el servidor",
      });
    }

    req.id_user = id_usuario;

    next();
  } catch (error) {
    return res.status(500).json({
      message: `SERVER ERROR:: ${error}`,
    });
  }
};
