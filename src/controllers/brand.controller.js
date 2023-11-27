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
      where: { nombre: name.toUpperCase() },
    });

    if (findBrand) {
      return res.status(400).json({
        message: "Marca registrada y habilitada anteriormente",
      });
    }

    const newData = await Brand.create({
      nombre: name.toUpperCase(),
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

//Listar marcas
export const listBrands = async (req, res) => {
  try {
    const listData = await Brand.findAll({
      attributes: [['id_marca', 'id'],'nombre','estado']
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
