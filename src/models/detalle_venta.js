import { DataTypes } from "sequelize";
import { database } from "../configuration/db.js";

export const SaleDetail = database.define(
  "detalle_ventas",
  {
    id_detalle_venta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    importe_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    descuento: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
