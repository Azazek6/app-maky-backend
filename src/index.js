import app from "./app.js";

const serverInit = () => {
  app.listen(app.get("PORT"));
  console.log(`server in port ${app.get("PORT")}`);
};

serverInit();
