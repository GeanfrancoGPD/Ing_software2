import session from "express-session";
import express from "express";
import cors from "cors";

const app = express();

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

export default app;
