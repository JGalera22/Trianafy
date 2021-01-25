import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from 'body-parser';
import morgan from "morgan";
import morganBody from "morgan-body";

// Imports de componentes del API
import models from './models';
import routes from './routes';

// Instanciación de la aplicación de Express
const app = express();

// Inicialización y configuración de algunos middlewares
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
morganBody(app);


app.use((req, res, next) => {
  // Para cualquier petición, añadimos en su contexto
  req.context = {
    // Todos los modelos
    models,
    // El "usuario actual". Ahora mismo simula que hayamos hecho un login
    // Más adelante, lo podremos conseguir de otra forma.
    me: models.songs.songRepository.findById(1)
  };
  next();
});

// Configuración de las rutas.
app.use('/songs', routes.song);
app.use('/listas', routes.lista);
app.use('/users', routes.user);

// Inicialización del servidor
app.listen(process.env.PORT, () =>
  console.log(
    `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
  )
);

console.log("Hola 👋 Node.js.");
console.log(process.env.MI_PASSWORD);
console.log(process.env.PORT);

