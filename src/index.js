import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("¡Hola Mundo!");
  });

  app.listen(process.env.PORT, () =>
  console.log(
    `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
  )
);


console.log("Hola 👋 Node.js.");
console.log(process.env.MI_PASSWORD);
console.log(process.env.PORT);
console.log("Odio esto");
