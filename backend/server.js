import { Dispatcher } from "./components/Dispatcher.js";
import session from "express-session";
import express from "express";
import cors from "cors";

const port = process.env.PORT || 5000;
const dispatcher = new Dispatcher();
const app = express();

dispatcher.init();

// Railway usa proxy
app.set("trust proxy", 1);

// --- CORS global ---
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        "https://localhost",
        "http://localhost:4200",
        "http://localhost:3000",
        "http://localhost:8100",
        "ionic://localhost",
        "capacitor://localhost",
        "https://ing-software2.onrender.com",
      ];

      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: '*',
//   })
// );

// JSON
app.use(express.json());

app.use(
  session({
    secret: "mi-clave-secreta",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    },
  })
);

// --- Rutas ---
app.post("/api/login", async (req, res) => {
  await dispatcher.login({ request: req, response: res });
});

app.post("/api/register", async (req, res) => {
  await dispatcher.registerUser({ request: req, response: res });
});

app.post("/api/recover", async (req, res) => {
  await dispatcher.recoverPassword({ request: req, response: res });
});

app.post("/api/resetpassword", async (req, res) => {
  await dispatcher.resetPassword({ request: req, response: res });
});

app.get("/api/getdata", async (req, res) => {
  await dispatcher.getData({ request: req, response: res });
});

app.post("/api/logout", (req, res) => {
  dispatcher.destroy({ request: req, response: res });
});

app.post("/api/toProccess", (req, res) => {
  dispatcher.toProccess({ request: req, response: res });
});

// --- START ---
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});
