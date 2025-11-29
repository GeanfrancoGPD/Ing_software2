import { Despatcher } from './components/Despatcher.js';
import session from 'express-session';
import express from 'express';
import cors from 'cors';

const port = process.env.PORT || 5000;
const despatcher = new Despatcher();
const app = express();

// Railway usa proxy
app.set('trust proxy', 1);

// JSON
app.use(express.json());

// --- CORS global ---
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        'http://localhost:4200',
        'http://localhost:3000',
        'http://localhost:8100',
      ];
      if (!origin || allowed.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(
  session({
    secret: 'mi-clave-secreta',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60,
    },
  })
);

// --- Rutas ---
app.post('/api/login', async (req, res) => {
  await despatcher.login({ request: req, response: res });
});

app.post('/api/register', async (req, res) => {
  await despatcher.registerUser({ request: req, response: res });
});

app.post('/api/recover', async (req, res) => {
  await despatcher.recoverPassword({ request: req, response: res });
});

app.post('/api/resetpassword', async (req, res) => {
  await despatcher.resetPassword({ request: req, response: res });
});

app.get('/api/getdata', async (req, res) => {
  await despatcher.getData({ request: req, response: res });
});

app.post('/api/logout', (req, res) => {
  despatcher.destroy({ request: req, response: res });
});

app.post('/api/toProccess', (req, res) => {
  despatcher.toProccess({ request: req, response: res });
});

// --- START ---
app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});
