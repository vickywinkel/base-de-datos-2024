import express from "express";
export const app = express();
const port = 3000;

import artistas from "./controllers/artistas.js";
import albumes from "./controllers/albumes.js";
import canciones from "./controllers/canciones.js";

// Middlewear
app.use(express.json());


// Rutas
app.get("/", (_, res) => {
    res.send("SpoTICfy API working!");
});

app.get("/canciones", (req, res) => {
    res.json(canciones.getCanciones())
})

app.get("/cancion/:id", (req, res) => {
    res.json(canciones.getCancion())
})

app.post("/canciones", (req, res) => {
    res.json(canciones.createCancion())
})

app.put("/canciones/:id", (req, res) => {
    res.json(canciones.updateCancion())
})

app.delete("/canciones/:id", (req, res) => {
    const idnum = req.query.idnum
    res.send(idnum)
})



app.get("/user", (req, res) =>{ //DE PRUEBA
    const nombre = req.query.nombre
    res.send(nombre)
})
/* ------------------- Rutas ------------------- */

// Artistas
// Completar con las rutas de artistas
// Para acceder a cada funcion de artistas, se debe hacer de la siguiente forma:
// artistas.getArtistas;
// artistas.getArtista;
// ...

// Albumes
// Completar con las rutas de albumes
// Para acceder a cada funcion de albumes, se debe hacer de la siguiente forma:
// albumes.getAlbumes;
// albumes.getAlbum;
// ...

// Canciones
// Completar con las rutas de canciones
// Para acceder a cada funcion de canciones, se debe hacer de la siguiente forma:
// canciones.getCanciones;
// canciones.getCancion;
// ...

app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
});

