import moment from "moment";
import { Order, OrderDetail, Product } from "../models/association.js";

// Generar Orden
export const createOrder = async (req, res) => {
  const {
    product,
    totalAmount,
    shippingMethod,
    distric,
    province,
    street,
    office,
    postalCode,
    details,
    email,
    names,
    lastnames,
    phone,
    documentTyoe,
    document,
    businessName,
    paymentMethod,
  } = req.body;

  if (product.length < 1) {
    return res.status(400).json({
      message: "Al menos debe escoger un producto a ordenar",
    });
  }

  if (
    totalAmount == "" ||
    shippingMethod == "" ||
    distric == "" ||
    province == "" ||
    street == "" ||
    email == "" ||
    names == "" ||
    lastnames == "" ||
    phone == "" ||
    documentTyoe == "" ||
    document == "" ||
    paymentMethod == ""
  ) {
    return res.status(400).json({
      message: "Hay campos obligatorios",
    });
  }

  if (documentTyoe == "FACTURA") {
    if (businessName == "") {
      return res.status(400).json({
        message: "La razon social es obligatoria",
      });
    }
  }

  try {
    Promise.all(
      product.map(async (itemProduct) => {
        const findProduct = await Product.findOne({
          where: { id_producto: itemProduct.id_producto, estado: 1 },
        });

        if (!findProduct) {
          return res.status(400).json({
            message: "Producto no valido",
          });
        }

        if (itemProduct.cantidad >= findProduct.cantidad) {
          return res.status(400).json({
            message: `El stock del producto ${itemProducto.nombre} es insuficiente`,
          });
        }
      })
    );

    const newOrder = await Order.create({
      id_usuario: req.id_user,
      monto_total: totalAmount,
      tipo_envio: shippingMethod,
      distrito: distric.toUpperCase(),
      provincia: province.toUpperCase(),
      calle_numero: street.toUpperCase(),
      oficina: office.toUpperCase(),
      codigo_postal: postalCode,
      detalles_orden: details.toUpperCase(),
      correo: email,
      nombres: names.toUpperCase(),
      apellidos: lastnames.toUpperCase(),
      telefono: phone,
      tipo_compra: documentTyoe,
      documento: document,
      razon_social: businessName.toUpperCase(),
      medio_pago: paymentMethod,
      fecha_registro: moment(),
    });

    if (!newOrder) {
      return res.status(400).json({
        message: "Ocurrió un problema al generar la orden...!",
      });
    }

    Promise.all(
      product.map(async (itemProduct) => {
        await OrderDetail.create({
          id_orden: newOrder.id_orden,
          id_producto: itemProduct.id_producto,
          cantidad: itemProduct.cantidad,
          precio_unidad: itemProduct.precio,
          total: itemProduct.monto_total,
        });
      })
    );

    return res.status(201).json({
      message: "Orden generada con exito...!",
      id_orden: newOrder.id_orden,
    });
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

// Listar todas las ordenes por Cliente
export const listOrdersForClient = async (req, res) => {
  try {
    const list = await Order.findAll({
      attributes: [
        "id_orden",
        "monto_total",
        "estado",
        "fecha_registro",
        "tipo_envio",
        "tipo_compra",
        "medio_pago",
        "imagen_compra"
      ],
      include: {
        attributes: ["id_orden_detalle", "total", "cantidad"],
        model: OrderDetail,
        include: {
          attributes: [
            "id_producto",
            "nombre",
            "precio",
            "imagen",
            "descripcion",
          ],
          model: Product,
        },
      },
      where: { id_usuario: req.id_user },
      order: [["fecha_registro", "DESC"]],
    });

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

// Listar todas las ordenes
export const listOrders = async (req, res) => {
  try {
    const list = await Order.findAll({
      attributes: [
        "id_orden",
        "monto_total",
        "estado",
        "fecha_registro",
        "tipo_envio",
        "tipo_compra",
        "medio_pago",
        "nombres",
        "apellidos",
        "documento",
        "telefono",
        "razon_social",
        "correo",
        "distrito",
        "provincia",
        "calle_numero",
        "oficina",
        "detalles_orden",
        "imagen_compra",
      ],
      include: {
        attributes: ["id_orden_detalle", "total", "cantidad"],
        model: OrderDetail,
        include: {
          attributes: [
            "id_producto",
            "codigo",
            "nombre",
            "precio",
            "imagen",
            "descripcion",
          ],
          model: Product,
        },
      },
      order: [["fecha_registro", "DESC"]],
    });

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

//Insertar Imagenes
export const insertImagesPay = async (req, res) => {
  const { id_order } = req.params;
  const { image } = req.body;

  if (!id_order) {
    return res.status(400).json({
      message: "Parametro requerido",
    });
  }

  if (!image) {
    return res.status(400).json({
      message: "Debe enviar su constancia",
    });
  }

  try {
    const createImage = await Order.update(
      {
        imagen_compra: image,
        estado: "REVISANDO",
      },
      {
        where: { id_orden: id_order },
      }
    );

    if (!createImage) {
      return res.status(400).json({
        message: "Error al guardar la imagen",
      });
    }

    return res.status(201).json({
      message: "Constancia envia para procesar",
    });
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};
