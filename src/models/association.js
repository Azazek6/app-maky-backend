import { Rol } from "./rol.js";
import { User } from "./user.js";
import { Brand } from "./brand.js";
import { Category } from "./category.js";
import { Gender } from "./gender.js";
import { Stage } from "./stage.js";
import { Product } from "./product.js";
import { ProductImage } from "./product_image.js";
import { ProductSize } from "./product_size.js";
import { ProductColor } from "./product_color.js";
import { Order } from "./order.js";
import { OrderDetail } from "./order_detail.js";
import { Client } from "./client.js";
import { Sale } from "./venta.js";
import { SaleDetail } from "./detalle_venta.js";

User.belongsTo(Rol, { foreignKey: "id_rol" });
Rol.hasMany(User, { foreignKey: "id_rol" });

Product.belongsTo(Brand, { foreignKey: "id_marca" });
Brand.hasMany(Product, { foreignKey: "id_marca" });

Product.belongsTo(Category, { foreignKey: "id_categoria" });
Category.hasMany(Product, { foreignKey: "id_categoria" });

Product.belongsTo(Gender, { foreignKey: "id_genero" });
Gender.hasMany(Product, { foreignKey: "id_genero" });

Product.belongsTo(Stage, { foreignKey: "id_etapa" });
Stage.hasMany(Product, { foreignKey: "id_etapa" });

ProductImage.belongsTo(Product, { foreignKey: "id_producto" });
Product.hasMany(ProductImage, { foreignKey: "id_producto" });

ProductSize.belongsTo(Product, { foreignKey: "id_producto" });
Product.hasMany(ProductSize, { foreignKey: "id_producto" });

ProductColor.belongsTo(Product, { foreignKey: "id_producto" });
Product.hasMany(ProductColor, { foreignKey: "id_producto" });

Order.belongsTo(User, { foreignKey: "id_usuario" });
User.hasMany(Order, { foreignKey: "id_usuario" });

OrderDetail.belongsTo(Order, { foreignKey: "id_orden" });
Order.hasMany(OrderDetail, { foreignKey: "id_orden" });

OrderDetail.belongsTo(Product, { foreignKey: "id_producto" });
Product.hasMany(OrderDetail, { foreignKey: "id_producto" });

Sale.belongsTo(Order, { foreignKey: "id_orden" });
Order.hasMany(Sale, { foreignKey: "id_orden" });

Sale.belongsTo(User, { foreignKey: "id_usuario" });
User.hasMany(Sale, { foreignKey: "id_usuario" });

Sale.belongsTo(Client, { foreignKey: "id_cliente" });
Client.hasMany(Sale, { foreignKey: "id_cliente" });

SaleDetail.belongsTo(Sale, { foreignKey: "id_venta" });
Sale.hasMany(SaleDetail, { foreignKey: "id_venta" });

SaleDetail.belongsTo(Product, { foreignKey: "id_producto" });
Product.hasMany(SaleDetail, { foreignKey: "id_producto" });

export {
  Rol,
  User,
  Brand,
  Category,
  Gender,
  Stage,
  Product,
  ProductImage,
  ProductSize,
  ProductColor,
  Order,
  OrderDetail,
  Client,
  Sale,
  SaleDetail,
};
