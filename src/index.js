import "dotenv/config";
import cors from "cors";
import express from "express";
import uuidv4 from 'uuid/v4';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*****************************************************/
let lists = {
  1: {
    listaId: '1',
    username: 'Claudia Valdivieso',
  },
  2: {
    listaId: '2',
    username: 'Carlos Zárate',
  },
};

let songs = {
  1: {
    songId: '1',
    text: 'Hola Mundo',
    userId: '1',
  },
  2: {
    songId: '2',
    text: 'Por el Mundo',
    userId: '2',
  },
};

/*******************************************/
/*
app.get('/', (req, res) => {
  return res.send('Recibió un método GET');
});

app.post('/', (req, res) => {
  return res.send('Recibió un método POST');
});

app.put('/', (req, res) => {
  return res.send('Recibió un método PUT');
});

app.delete('/', (req, res) => {
  return res.send('Recibió un método DELETE');
});

app.listen(process.env.PORT, () =>
  console.log(
    `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
  )
);
*/
/*********************************************************************************/
app.post('/lists', (req, res) => {
  const id = uuidv4();
  const list = {
    id,
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

/**********************************************************************************/

app.post('/songs', (req, res) => {
  return res.send('Añade una nueva canción.');
});

app.get('/songs', (req, res) => {
  return res.send('Ver todas las canciones existentes');
});

app.get('/songs/:songId', (req, res) => {
  return res.send('Ver la descripción de una canción seleccionada.');
});

app.put('/songs/songId', (req, res) => {
  return res.send(
    `Modificar el contenido de una canción (salvo el id, que no se puede modificar)/${req.params.songId}`,
  );
});

app.delete('/songs/songId', (req, res) => {
  return res.send(
    `Borrar una canción./${req.params.songId}`,
  );
});

/**********************************************************************************/

console.log("Hola 👋 Node.js.");
console.log(process.env.MI_PASSWORD);
console.log(process.env.PORT);

