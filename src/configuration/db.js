import { Sequelize } from "sequelize";

// export const database = new Sequelize("db_makys_shop", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   timezone: "-05:00",
//   pool: {
//     max: 100,
//     min: 0,
//     idle: 10000,
//   },
// });

export const database = new Sequelize(
  "sql3665333",
  "sql3665333",
  "y2qFfYdIsd",
  {
    port: 3306,
    host: "sql3.freemysqlhosting.net",
    dialect: "mysql",
    timezone: "-05:00",
    logging: false,
    pool: {
      max: 100,
      min: 0,
      idle: 10000,
    },
  }
);

export const conecctionDB = async () => {
  try {
    await database.authenticate();
    console.log("DATABASE SUCCCESS:: conectado a la base de datos");
  } catch (error) {
    console.log("DATABASE ERROR::", error);
  }
};
