import express from "express";
import * as dotenv from 'dotenv';
dotenv.config()
import router from "./routes/router-account.js";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => console.log(`running server https://localhost:${process.env.PORT}`));
