import moment from "moment";
import { Sale, SaleDetail, Product, Client } from "../models/association.js";

// Generar Venta
export const createSale = async (req, res) => {
  const {
    id_order,
    id_seller,
    id_client,
    type_purchase,
    payment_method,
    amount,
    products,
    obervation,
  } = req.body;

  if (
    !id_seller ||
    !id_client ||
    !type_purchase ||
    !payment_method ||
    !amount
  ) {
    return res.status(400).json({
      message: "Hay campos sin completar",
    });
  }

  if (products.length <= 0) {
    return res.status(400).json({
      message: "Al menos tiene que enviar un producto",
    });
  }

  try {
    const newSale = await Sale.create({
      id_orden: id_order,
      id_usuario: id_seller,
      id_cliente: id_client,
      tipo_comprobante: type_purchase,
      tipo_pago: payment_method,
      total: amount,
      observaciones: obervation,
      fecha_registro: moment(),
    });

    if (!newSale) {
      return res.status(400).json({
        message: "Se ha generado una venta",
      });
    }

    Promise.all(
      products.map(async (itemProduct) => {
        const findProduct = await Product.findOne({
          where: { id_producto: itemProduct.id_product },
        });

        if (!findProduct) {
          return res.status(400).json({
            message: "Producto no encontrado",
          });
        }

        const updateStock = await Product.update(
          {
            cantidad:
              parseFloat(findProduct.cantidad) - parseFloat(itemProduct.stock),
          },
          {
            where: { id_producto: itemProduct.id_product },
          }
        );

        if (!updateStock) {
          return res.status(400).json({
            message: "Error al descontar producto",
          });
        }

        const newDetail = await SaleDetail.create({
          id_venta: newSale.id_venta,
          id_producto: itemProduct.id_product,
          precio: itemProduct.price,
          cantidad: itemProduct.stock,
          importe_total: itemProduct.monto_total,
          descuento: itemProduct.discount,
        });

        if (!newDetail) {
          return res.status(400).json({
            message: "Ocurrió un error al crear el detalle",
          });
        }
      })
    );

    return res.status(201).json({
      message: "Se ha generado una venta",
      id_sale: newSale.id_venta,
    });
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

//Listar venta para PDF por id
export const listReportPDF = async (req, res) => {
  const { id_sale } = req.params;

  if (!id_sale) {
    return res.status(400).json({
      message: "Parametro requerido",
    });
  }

  try {
    const findSale = await Sale.findByPk(id_sale);

    if (!findSale) {
      return res.status(400).json({
        message: "Venta no valida",
      });
    }

    const list = await Sale.findOne({
      include: [
        {
          model: SaleDetail,
          include: {
            attributes: ["nombre"],
            model: Product,
          },
        },
        {
          model: Client,
        },
      ],
      where: { id_venta: id_sale },
    });

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};

// Listar ventas en general
export const listSales = async (req, res) => {
  try {
    const list = await Sale.findAll({
      include: [
        {
          model: SaleDetail,
          include: {
            attributes: ["nombre"],
            model: Product,
          },
        },
        {
          model: Client,
        },
      ],
    });

    if (list.length == 0) {
      return res.status(400).json({
        message: "Aun no hay ventas",
      });
    }

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};
