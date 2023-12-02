import { DataTypes } from "sequelize";
import { database } from "../configuration/db.js";

export const ProductImage = database.define(
  "producto_imagenes",
  {
    id_producto_imagen: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
