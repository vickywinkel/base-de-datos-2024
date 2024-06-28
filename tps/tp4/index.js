import express from "express"; //IMPORTA LA LIBRERIA EXPRESS
export const app = express(); 
const port = 3000;

import artistas from "./controllers/artistas.js"; 
import albumes from "./controllers/albumes.js";
import canciones from "./controllers/canciones.js";

// Middlewear
app.use(express.json());


// Rutas
app.get("/", (_, res) => {
    res.send("SpoTICfy API working!"); //ESTO ES PARTE DE LA CONSIGNA
});


/* napp.get("/user", (req, res) =>{ //DE PRUEBA
    const nombre = req.query.nombre
    res.send(nombre)
}) */
/* ------------------- Rutas ------------------- */

// Artistas
// Completar con las rutas de artistas
// Para acceder a cada funcion de artistas, se debe hacer de la siguiente forma:
// artistas.getArtistas;
// artistas.getArtista;
// ...

app.get("/artistas", artistas.getArtistas);  //CONECTAMOS Q CUANDO LLEGUE LA REQ LLAME A LA FUNCIÓN. 
app.get("/artistas/:id", artistas.getArtista);
app.post("/artistas", artistas.createArtista); 
app.put("/artistas/:id", artistas.updateArtista);
app.delete("/artistas/:id", artistas.deleteArtista); 
app.get("/artistas/:id/albumes", artistas.getAlbumesByArtista); 
app.get("/artistas/:id/canciones", artistas.getCancionesByArtista); 


// Albumes
// Completar con las rutas de albumes
// Para acceder a cada funcion de albumes, se debe hacer de la siguiente forma:
// albumes.getAlbumes;
// albumes.getAlbum;
// ...

app.get("/albumes", albumes.getAlbumes); //chequear
app.get("/albumes/:id", albumes.getAlbum); //chequear
app.post("/albumes", albumes.createAlbum); //chequar
app.put("/albumes/:id", albumes.updateAlbum);
app.delete("/albumes/:id", albumes.deleteAlbum);
app.get("/albumes/:id/canciones", albumes.getCancionesByAlbum);


// Canciones
// Completar con las rutas de canciones
// Para acceder a cada funcion de canciones, se debe hacer de la siguiente forma:
// canciones.getCanciones;
// canciones.getCancion;
// ...

app.get("/canciones", canciones.getCanciones);  //CONECTAMOS Q CUANDO LLEGUE LA REQ LLAME A LA FUNCIÓN. 
app.get("/canciones/:id", canciones.getCancion);
app.post("/canciones", canciones.createCancion); 
app.put("/canciones/:id", canciones.updateCancion);
app.delete("/canciones/:id", canciones.deleteCancion); 
app.put("/canciones/:id/reproducir", canciones.reproducirCancion);



app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
});

