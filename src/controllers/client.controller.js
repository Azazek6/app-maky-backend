import moment from "moment";
import { Client } from "../models/association.js";

// Añadir nuevo cliente
export const createClient = async (req, res) => {
  const { type, document, names, lastnames, email, phone } = req.body;

  if (!type || !document || !names) {
    return res.status(400).json({
      message: "Los campos son obligatorios",
    });
  }

  try {
    const findClient = await Client.findOne({
      where: { documento: document },
    });

    if (findClient) {
      return res.status(400).json({
        message: "El documento fue registrado anteriormente",
      });
    }

    const newData = await Client.create({
      tipo_documento: type.toUpperCase(),
      documento: document,
      nombres: names.toUpperCase(),
      apellidos: lastnames.toUpperCase(),
      email: email,
      telefono: phone,
      fecha_registro: moment(),
    });

    if (!newData) {
      return res.status(400).json({
        message: "Ocurrio un problema al agregar el cliente..!",
      });
    }

    return res.status(201).json({
      message: "Has añadido un nuevo cliente..!",
      id: newData.id_cliente,
    });
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

// Listar todos los clientes
export const listClients = async (req, res) => {
  try {
    const list = await Client.findAll();

    if (list.length <= 0) {
      return res.status(400).json({
        message: "Aun no hay datos a mostrar",
      });
    }

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

// Listar clientes por ID
export const listClientForDocument = async (req, res) => {
  const { document } = req.params;

  if (!document) {
    return res.status(400).json({
      message: "Parametro requerido",
    });
  }

  try {
    const list = await Client.findOne({
      where: { documento: document },
    });

    if (!list) {
      return res.status(400).json({
        message: "No se ha encontrado al cliente...!",
      });
    }

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};
