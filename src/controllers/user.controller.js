//Crear usuario
import moment from "moment";
import { User, Rol } from "../models/association.js";
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
      estado: status,
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

// Editar usuarios Clientes | Panel Administrativo
export const updateUser = async (req, res) => {
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
  console.log(req.body);
  const { id_usuario } = req.params;

  if (!id_usuario) {
    return res.status(400).json({
      message: "Parametro requerido",
    });
  }

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

  try {
    const newData = await User.update(
      {
        documento: document,
        nombres: names.toUpperCase(),
        apellidos: lastnames.toUpperCase(),
        usuario: username,
        email: email,
        telefono: phone,
        estado: status,
      },
      { where: { id_usuario: id_usuario } }
    );

    if (!newData) {
      return res.status(400).json({
        message: "Error al editar usuario",
      });
    }
    return res.status(201).json({
      message: "Datos modificados...!",
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
      include: {
        attributes: ["id_rol", "nombre"],
        model: Rol,
      },
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

//Listar usuario por ID
export const listUserForId = async (req, res) => {
  const { id_usuario } = req.params;

  if (!id_usuario) {
    return res.status(400).json({
      message: "Parametro requerido",
    });
  }

  try {
    const listData = await User.findOne({
      attributes: [
        ["id_usuario", "id"],
        "documento",
        "nombres",
        "apellidos",
        "usuario",
        "email",
        "telefono",
        "estado",
        "password",
        "id_rol",
        "fecha_registro",
      ],
      include: {
        attributes: ["id_rol", "nombre"],
        model: Rol,
      },
      where: { id_usuario: id_usuario },
    });

    if (!listData) {
      return res.status(400).json({
        message: "Usuario no valido",
      });
    }

    return res.status(200).json(listData);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};
