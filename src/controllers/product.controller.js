import moment from "moment";
import {
  Product,
  ProductImage,
  ProductSize,
  ProductColor,
  Brand,
  Category,
  Gender,
  Stage,
} from "../models/association.js";

//Insertar producto
export const createProduct = async (req, res) => {
  const {
    code,
    name,
    price,
    id_brand,
    stock,
    id_category,
    size,
    image,
    description,
    id_gender,
    id_stage,
  } = req.body;

  if (
    !code ||
    !name ||
    !price ||
    !stock ||
    !id_brand ||
    !id_category ||
    !description ||
    !id_gender ||
    !id_stage ||
    size.length == 0
  ) {
    return res.status(400).json({
      message: "Los campos son obligatorios",
    });
  }

  if (price <= 0) {
    return res.status(400).json({
      message: "El precio debe ser mayor a 0",
    });
  }

  try {
    const findBrand = await Brand.findOne({
      where: { id_marca: id_brand, estado: 1 },
    });

    const findCategory = await Category.findOne({
      where: { id_categoria: id_category, estado: 1 },
    });

    if (!findBrand) {
      return res.status(400).json({
        message: "Marca no reconocida o no habilitada..!",
      });
    }

    if (!findCategory) {
      return res.status(400).json({
        message: "Categoria no reconocida o no habilitada..!",
      });
    }

    const findProduct = await Product.findOne({
      where: { codigo: code, estado: 1 },
    });

    if (findProduct) {
      return res.status(400).json({
        message: "El codigo ingresado ya está en uso..!",
      });
    }

    const newData = await Product.create({
      codigo: code,
      nombre: name,
      precio: price,
      cantidad: stock,
      id_marca: id_brand,
      id_categoria: id_category,
      imagen: image,
      descripcion: description,
      id_usuario: req.id_user,
      id_genero: id_gender,
      id_etapa: id_stage,
      fecha_registro: moment(),
    });

    if (!newData) {
      return res.status(400).json({
        message: "Error al crear producto..!",
      });
    }

    Promise.all(
      size.map(async ({ name, status }) => {
        if (status) {
          await ProductSize.create({
            id_producto: newData.id_producto,
            talla: name.toUpperCase(),
            fecha_registro: moment(),
          });
        }
      })
    );

    return res.status(201).json({
      message: "Se ha registrado un nuevo producto..!",
    });
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

//Actualizar producto
export const updateProduct = async (req, res) => {
  const { id_producto } = req.params;
  const {
    code,
    name,
    price,
    id_brand,
    stock,
    id_category,
    size,
    image,
    description,
    id_gender,
    id_stage,
  } = req.body;

  if (!id_producto) {
    return res.status(400).json({
      message: "Parametro requerido",
    });
  }

  if (
    !code ||
    !name ||
    !price ||
    !stock ||
    !id_brand ||
    !id_category ||
    !description ||
    !id_gender ||
    !id_stage ||
    size.length == 0
  ) {
    return res.status(400).json({
      message: "Los campos son obligatorios",
    });
  }

  if (price <= 0) {
    return res.status(400).json({
      message: "El precio debe ser mayor a 0",
    });
  }

  try {
    const findBrand = await Brand.findOne({
      where: { id_marca: id_brand, estado: 1 },
    });

    const findCategory = await Category.findOne({
      where: { id_categoria: id_category, estado: 1 },
    });

    if (!findBrand) {
      return res.status(400).json({
        message: "Marca no reconocida o no habilitada..!",
      });
    }

    if (!findCategory) {
      return res.status(400).json({
        message: "Categoria no reconocida o no habilitada..!",
      });
    }

    const newData = await Product.update(
      {
        codigo: code,
        nombre: name,
        precio: price,
        cantidad: stock,
        id_marca: id_brand,
        id_categoria: id_category,
        imagen: image,
        descripcion: description,
        id_usuario: req.id_user,
        id_genero: id_gender,
        id_etapa: id_stage,
      },
      {
        where: { id_producto: id_producto },
      }
    );

    if (!newData) {
      return res.status(400).json({
        message: "Error al modificar datos del producto..!",
      });
    }

    await ProductSize.destroy({
      where: { id_producto: id_producto },
    });

    Promise.all(
      size.map(async ({ name, status }) => {
        if (status) {
          await ProductSize.create({
            id_producto: id_producto,
            talla: name.toUpperCase(),
            fecha_registro: moment(),
          });
        }
      })
    );

    return res.status(201).json({
      message: "Se han modificado los datos del producto..!",
    });
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

//Insertar colores
const createProductColor = async (req, res) => {};

//Listar Productos
export const listProducts = async (req, res) => {
  try {
    const listData = await Product.findAll({
      attributes: [
        ["id_producto", "id"],
        "codigo",
        "nombre",
        "precio",
        "cantidad",
        "descripcion",
        "imagen",
        "estado",
        "fecha_registro",
      ],
      include: [
        {
          attributes: ["talla"],
          model: ProductSize,
        },
        {
          attributes: ["id_marca", "nombre"],
          model: Brand,
        },
        {
          attributes: ["id_categoria", "nombre"],
          model: Category,
        },
        {
          attributes: ["id_genero", "nombre"],
          model: Gender,
        },
        {
          attributes: ["id_etapa", "nombre"],
          model: Stage,
        },
      ],
    });

    if (listData.length == 0) {
      return res.status(400).json({
        message: "No hay datos para mostrar",
      });
    }

    return res.status(200).json(listData);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

//Listar producto por ID
export const listProductForId = async (req, res) => {
  const { id_producto } = req.params;

  if (!id_producto) {
    return res.status(400).json({
      message: "Parametro requerido",
    });
  }

  try {
    const listData = await Product.findOne({
      attributes: [
        ["id_producto", "id"],
        "codigo",
        "nombre",
        "precio",
        "cantidad",
        "descripcion",
        "imagen",
        "estado",
        "fecha_registro",
      ],
      include: [
        {
          attributes: ["talla"],
          model: ProductSize,
        },
        {
          attributes: ["id_marca", "nombre"],
          model: Brand,
        },
        {
          attributes: ["id_categoria", "nombre"],
          model: Category,
        },
        {
          attributes: ["id_genero", "nombre"],
          model: Gender,
        },
        {
          attributes: ["id_etapa", "nombre"],
          model: Stage,
        },
      ],
      where: { id_producto: id_producto },
    });

    if (!listData) {
      return res.status(400).json({
        message: "Producto no encontrado",
      });
    }

    return res.status(200).json(listData);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

//Insertar Imagenes
export const insertImagesDetail = async (req, res) => {
  const { id_producto } = req.params;
  const { images } = req.body;

  if (!id_producto) {
    return res.status(400).json({
      message: "Parametro requerido",
    });
  }

  if (images.length <= 0) {
    return res.status(400).json({
      message: "Debe agregar aunque sea una imagen",
    });
  }

  try {
    Promise.all(
      images.map(async ({ name }) => {
        const createImage = await ProductImage.create({
          id_producto: id_producto,
          imagen: name,
        });

        if (!createImage) {
          return res.status(400).json({
            message: "Error al crear la imagen",
          });
        }
      })
    );

    return res.status(201).json({
      message: "Imagenes agregadas al producto",
    });
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};
