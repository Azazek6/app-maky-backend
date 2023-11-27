import express from "express";
import cors from "cors";
import { PORT } from "./configuration/general.js";
import routes from "./routes/index.js";

const app = express();

app.set("PORT", PORT);
app.use(cors());
app.use(express.json());
app.use('/api',routes)

export default app;
