import { Despatcher } from "./components/Despatcher.js";
import session from "express-session";
import express from "express";
import { promises } from "fs";
import cors from "cors";
// import { request } from 'http';
// import { response } from 'express';
const poolConfig = JSON.parse(
  await promises.readFile("./data/DBConfig.json", "utf-8")
);
const port = process.env.PORT || 5001;
const despatcher = new Despatcher(poolConfig);
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
app.use(express.json());
app.use(
  session({
    secret: "mi-clave-secreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 2,
    },
  })
);

app.post("/api/login", async (request, response) => {
  await despatcher.login({ request, response });
});

app.post("/api/register", async (request, response) => {
  await despatcher.registerUser({ request, response });
});

app.post("/api/recover", async (request, response) => {
  await despatcher.recoverPassword({ request, response });
});

app.post("/api/resetpassword", async (request, response) => {
  await despatcher.resetPassword({ request, response });
});

app.get("/api/getdata", async (request, response) => {
  await despatcher.getData({ request, response });
});

app.post("/api/logout", (request, response) => {
  despatcher.destroy({ request, response });
});

app.post("/api/ToProccess", (request, response) => {
  despatcher.ToProccess({ request, response });
});

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});
