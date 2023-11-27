import { Sequelize } from "sequelize";

export const database = new Sequelize("db_makys_shop", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-05:00",
  pool: {
    max: 100,
    min: 0,
    idle: 10000,
  },
});

// export const database = new Sequelize(
//   "if0_35504982_db_makys_shop",
//   "if0_35504982",
//   "Espinol@70991065",
//   {
//     port: 3306,
//     host: "sql109.infinityfree.com",
//     dialect: "mysql",
//     timezone: "-05:00",
//     logging: false,
//     pool: {
//       max: 100,
//       min: 0,
//       idle: 10000,
//     },
//   }
// );

export const conecctionDB = async () => {
  try {
    await database.authenticate();
    console.log("DATABASE SUCCCESS:: conectado a la base de datos");
  } catch (error) {
    console.log("DATABASE ERROR::", error);
  }
};
