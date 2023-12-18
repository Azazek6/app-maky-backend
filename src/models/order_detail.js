import { DataTypes } from "sequelize";
import { database } from "../configuration/db.js";

export const OrderDetail = database.define(
  "orden_detalles",
  {
    id_orden_detalle: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_orden: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unidad: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
