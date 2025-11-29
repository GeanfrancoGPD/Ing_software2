import { Despatcher } from './components/Despatcher.js';
import session from 'express-session';
import express from 'express';
import cors from 'cors';

const port = process.env.PORT || 5000;
const despatcher = new Despatcher();
const app = express();

// --- Middlewares ---
app.use(express.json());
app.use(
  session({
    secret: 'mi-clave-secreta',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 hora
    },
  })
);

// --- CORS global ---
const corsOptions = {
  origin: [
    'http://localhost:8100',
    'http://localhost:4200',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
};
app.use(cors(corsOptions));

// --- Middleware explícito para preflight OPTIONS ---
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin || '';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,DELETE,OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type,Authorization,Cookie'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204);
  }
  next();
});

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
