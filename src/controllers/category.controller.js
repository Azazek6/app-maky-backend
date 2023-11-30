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
      where: { nombre: name },
    });

    if (findCategory) {
      return res.status(400).json({
        message: "Categoria registrada y habilitada anteriormente",
      });
    }

    const newData = await Category.create({
      nombre: name,
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

//Modificar categoria
export const updateCategory = async (req, res) => {
  const { name, status } = req.body;
  const { id_categoria } = req.params;

  if (!id_categoria) {
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
    const newData = await Category.update(
      {
        nombre: name,
        estado: status,
      },
      { where: { id_categoria: id_categoria } }
    );

    if (!newData) {
      return res.status(400).json({
        message: "Ocurrio un problema al modificar la categoria..!",
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
      attributes: [["id_categoria", "id"], "nombre", "estado"],
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

//Listar Categoria por Id
export const listCategoryForId = async (req, res) => {
  const { id_categoria } = req.params;

  if (!id_categoria) {
    return res.status(400).json({
      message: "Parametro requerido",
    });
  }

  try {
    const listData = await Category.findOne({
      attributes: [["id_categoria", "id"], "nombre", "estado"],
      where: { id_categoria: id_categoria },
    });

    if (!listData) {
      return res.status(400).json({
        message: "Categoria no registrada",
      });
    }

    return res.status(200).json(listData);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};
