import { DataTypes } from "sequelize";
import { database } from "../configuration/db.js";

export const Order = database.define(
  "ordenes",
  {
    id_orden: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monto_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    imagen_compra: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo_envio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distrito: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provincia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calle_numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    oficina: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    codigo_postal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    detalles_orden: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_compra: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    razon_social: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medio_pago: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
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
