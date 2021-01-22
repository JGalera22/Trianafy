import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from 'body-parser';
import morgan from "morgan";
import morganBody from "morgan-body";

import models from './models';

const app = express();

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

// Inicialización del servidor
app.listen(process.env.PORT, () =>
  console.log(
    `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
  )
);



/*
app.post('/lists', (req, res) => {
  const listaId = uuidv4();
  const list = {
    listaId,
    text: req.body.text,
  };

  lists[id] = list;

  return res.send(list);
});

app.get('/lists', (req, res) => {
  return res.send(Object.values(lists));
});

app.get('/lists/:listaId', (req, res) => {
  return res.send(lists[req.params.listaId]);
});

app.put('/lists/:listaId', (req, res) => {
  return res.send(
    `Modificar el contenido de una lista de reproducción (salvo el id, que no se puede modificar)/${req.params.listaId}`,
  );
});

app.delete('/lists/:listaId', (req, res) => {
  return res.send(
    `Borrar una lista de reproducción./${req.params.listaId}`,
  );
});



app.post('/songs', (req, res) => {
  return res.send('Añade una nueva canción.');
});

app.get('/songs', (req, res) => {
  return res.send(Object.values(songs));
});

app.get('/songs/:{id}', (req, res) => {
  return res.send(songs[req.params.id]);
});

app.put('/songs/:{id}', (req, res) => {
  return res.send(
    `Modificar el contenido de una canción (salvo el id, que no se puede modificar)/${req.params.id}`,
  );
});

app.delete('/songs/:{id}', (req, res) => {
  return res.send(
    `Borrar una canción./${req.params.songId}`,
  );
});
*/

console.log("Hola 👋 Node.js.");
console.log(process.env.MI_PASSWORD);
console.log(process.env.PORT);

