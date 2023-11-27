import moment from "moment";
import { Category } from "../models/association.js";

//Insertar categoria
export const createCategory = async (req, res) => {
  const { name, status } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Los campos son obligatorios",
    });
  }

  try {
    const findCategory = await Category.findOne({
      where: { nombre: name.toUpperCase() },
    });

    if (findCategory) {
      return res.status(400).json({
        message: "Categoria registrada y habilitada anteriormente",
      });
    }

    const newData = await Category.create({
      nombre: name.toUpperCase(),
      estado: status,
      fecha_registro: moment(),
    });

    if (!newData) {
      return res.status(400).json({
        message: "Ocurrio un problema al registrar la categoria..!",
      });
    }

    return res.status(201).json({
      message: "Se ha registrado una nueva categoria..!",
    });
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

//Listar Categorias
export const listCategories = async (req, res) => {
  try {
    const listData = await Category.findAll({
      attributes: [['id_categoria', 'id'],'nombre','estado']
    });

    if (listData.length == 0) {
      return res.status(400).json({
        message: "Aun no hay categorias registradas",
      });
    }

    return res.status(200).json(listData);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};
