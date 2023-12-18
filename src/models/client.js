import { DataTypes } from "sequelize";
import { database } from "../configuration/db.js";

export const Client = database.define(
  "clientes",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo_documento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
