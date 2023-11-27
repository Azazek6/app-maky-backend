//Crear usuario
import moment from "moment";
import { User } from "../models/association.js";
import { passwordEncrypt } from "../helpers/auth.js";

// Registrar usuarios Clientes | Panel Administrativo
export const createUser = async (req, res) => {
  const {
    document,
    names,
    lastnames,
    username,
    email,
    phone,
    password,
    id_rol,
    status,
  } = req.body;

  if (!email || !password || !id_rol) {
    return res.status(400).json({
      message: "Campos obligatorios",
    });
  }

  // Cuando es usuario del panel
  if (id_rol == 2) {
    if (!names || !lastnames || !username || !document || !phone) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }
  }

  const findUser = await User.findOne({ where: { email: email } });

  if (findUser) {
    return res.status(400).json({
      message: "El correo ya se encuentra registrado",
    });
  }

  if (document != "") {
    const findUser = await User.findOne({ where: { documento: document } });

    if (findUser) {
      return res.status(400).json({
        message: "El documento ya se encuentra registrado",
      });
    }
  }

  const newPassword = await passwordEncrypt(password);

  try {
    const newData = await User.create({
      documento: document,
      nombres: names.toUpperCase(),
      apellidos: lastnames.toUpperCase(),
      usuario: username,
      email: email,
      telefono: phone,
      password: newPassword,
      status: status,
      id_rol: id_rol,
      fecha_registro: moment(),
    });

    if (!newData) {
      return res.status(400).json({
        message: "Error al registrar usuario",
      });
    }
    return res.status(201).json({
      message: "Registro exitoso",
    });
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

//Listar usuarios
export const listUsers = async (req, res) => {
  try {
    const listData = await User.findAll({
      attributes: [
        ["id_usuario", "id"],
        "documento",
        "nombres",
        "apellidos",
        "usuario",
        "email",
        "telefono",
        "estado",
        "id_rol",
        "fecha_registro",
      ],
    });

    if (listData.length == 0) {
      return res.status(400).json({
        message: "Aun no hay datos",
      });
    }

    return res.status(200).json(listData);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};
