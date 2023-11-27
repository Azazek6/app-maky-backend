import { Rol } from "./rol.js";
import { User } from "./user.js";
import { Brand } from "./brand.js";
import { Category } from "./category.js";
import { Product } from "./product.js";
import { ProductSize } from "./product_size.js";
import { ProductColor } from "./product_color.js";

User.belongsTo(Rol, { foreignKey: "id_rol" });
Rol.hasMany(User, { foreignKey: "id_rol" });

Product.belongsTo(Brand, { foreignKey: "id_marca" });
Brand.hasMany(Product, { foreignKey: "id_marca" });

Product.belongsTo(Category, { foreignKey: "id_categoria" });
Category.hasMany(Product, { foreignKey: "id_categoria" });

ProductSize.belongsTo(Product, { foreignKey: "id_producto" });
Product.hasMany(ProductSize, { foreignKey: "id_producto" });

ProductColor.belongsTo(Product, { foreignKey: "id_producto" });
Product.hasMany(ProductColor, { foreignKey: "id_producto" });

export { Rol, User, Brand, Category, Product, ProductSize, ProductColor };
