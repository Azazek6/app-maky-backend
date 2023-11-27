import jwt from "jsonwebtoken";
import { User, Rol } from "../models/association.js";
import { passwordVerify } from "../helpers/auth.js";
import { jwtSecret } from "../configuration/general.js";

//Iniciar sesion Cliente
export const signInClient = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Campos obligatorios",
    });
  }

  try { 
    const findUser = await User.findOne({
      attributes: ["id_usuario", "usuario", "email", "password"],
      include: {
        model: Rol,
      },
      where: { email: email, estado: 1 },
    });

    if (!findUser) {
      return res.status(400).json({
        message: "Correo no encontrado o inactivo",
      });
    }

    const isValidatePassword = await passwordVerify(
      password,
      findUser.password
    );

    if (!isValidatePassword) {
      return res.status(400).json({
        message: "La contraseña no coincide con la registrada",
      });
    }

    const dataToken = {
      id_usuario: findUser.id_usuario,
      id_rol: findUser.role.id_rol,
      nombre_rol: findUser.role.nombre,
      email: findUser.email,
      usuario: findUser.usuario,
    };

    const token = jwt.sign(dataToken, jwtSecret);

    return res.status(201).json({
      message: "Acceso Verificado...!",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `SERVER ERROR:: ${error}`,
    });
  }
};

//Iniciar sesion Panel
export const signInPanel = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Campos obligatorios",
    });
  }

  try {
    const findUser = await User.findOne({
      attributes: ["id_usuario", "usuario", "email", "password"],
      include: {
        model: Rol,
      },
      where: { usuario: username, estado: 1, id_rol: 2 },
    });

    if (!findUser) {
      return res.status(400).json({
        message: "Usuario no encontrado o inactivo",
      });
    }

    const isValidatePassword = await passwordVerify(
      password,
      findUser.password
    );

    if (!isValidatePassword) {
      return res.status(400).json({
        message: "La contraseña no coincide con la registrada",
      });
    }

    const dataToken = {
      id_usuario: findUser.id_usuario,
      id_rol: findUser.role.id_rol,
      nombre_rol: findUser.role.nombre,
      email: findUser.email,
      usuario: findUser.usuario,
    };

    const token = jwt.sign(dataToken, jwtSecret);

    return res.status(201).json({
      message: "Acceso Verificado...!",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `SERVER ERROR:: ${error}`,
    });
  }
};
