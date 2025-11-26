import { Despatcher } from './components/Despatcher.js';
import session from 'express-session';
import express from 'express';
import { promises } from 'fs';
import cors from 'cors';
// import { request } from 'http';
// import { response } from 'express';
const poolConfig = JSON.parse(
  await promises.readFile('./data/DBConfig.json', 'utf-8')
);
const port = process.env.PORT || 5000;
const despatcher = new Despatcher(poolConfig);
const app = express();
app.use(
  cors({
    origin: [
      'http://localhost:8100',
      'http://localhost:4200',
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  })
);
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

app.post('/api/login', async (request, response) => {
  await despatcher.login({ request, response });
});

app.post('/api/register', async (request, response) => {
  await despatcher.registerUser({ request, response });
});

app.post('/api/recover', async (request, response) => {
  await despatcher.recoverPassword({ request, response });
});

app.post('/api/resetpassword', async (request, response) => {
  await despatcher.resetPassword({ request, response });
});

app.get('/api/getdata', async (request, response) => {
  await despatcher.getData({ request, response });
});

app.post('/api/logout', (request, response) => {
  despatcher.destroy({ request, response });
});

app.post('/api/toProccess', (request, response) => {
  despatcher.toProccess({ request, response });
});

app.post('/api/resetPassword', (request, response) => {
  despatcher.recoverPassword({ request, response });
});

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});
