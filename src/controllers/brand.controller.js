import moment from "moment";
import { Brand } from "../models/association.js";
import { Sequelize } from "sequelize";

//Insertar marca
export const createBrand = async (req, res) => {
  const { name, status } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Los campos son obligatorios",
    });
  }

  try {
    const findBrand = await Brand.findOne({
      where: { nombre: name },
    });

    if (findBrand) {
      return res.status(400).json({
        message: "Marca registrada y habilitada anteriormente",
      });
    }

    const newData = await Brand.create({
      nombre: name,
      estado: status,
      fecha_registro: moment(),
    });

    if (!newData) {
      return res.status(400).json({
        message: "Ocurrio un problema al registrar la marca..!",
      });
    }

    return res.status(201).json({
      message: "Se ha registrado una nueva marca..!",
    });
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

//Editar marca por Id
export const updateBrand = async (req, res) => {
  const { name, status } = req.body;
  const { id_marca } = req.params;

  if (!id_marca) {
    return res.status(400).json({
      message: "Parametro requerido",
    });
  }

  if (!name) {
    return res.status(400).json({
      message: "Los campos son obligatorios",
    });
  }

  try {
    const newData = await Brand.update(
      {
        nombre: name,
        estado: status,
      },
      { where: { id_marca: id_marca } }
    );

    if (!newData) {
      return res.status(400).json({
        message: "Ocurrio un problema al modificar la marca..!",
      });
    }

    return res.status(201).json({
      message: "Los datos de la marca ha sido modificados..!",
    });
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

//Listar marcas
export const listBrands = async (req, res) => {
  try {
    const listData = await Brand.findAll({
      attributes: [["id_marca", "id"], "nombre", "estado"],
    });

    if (listData.length == 0) {
      return res.status(400).json({
        message: "Aun no hay marcas registradas",
      });
    }

    return res.status(200).json(listData);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

//Listar marca por ID
export const listBrandForId = async (req, res) => {
  const { id_marca } = req.params;

  if (!id_marca) {
    return res.status(400).json({
      message: "Parametro requerido",
    });
  }

  try {
    const listData = await Brand.findOne({
      attributes: [["id_marca", "id"], "nombre", "estado"],
      where: { id_marca: id_marca },
    });

    if (!listData) {
      return res.status(400).json({
        message: "Marca no registrada",
      });
    }

    return res.status(200).json(listData);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};
