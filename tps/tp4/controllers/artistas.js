import { conn } from "../db.js";

const getArtistas = async (_, res) => {
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
    //1. BUSCAR LOS DATOS DE LA BD    
        const [rows, fields] = await conn.query("SELECT * FROM artistas");

    //2. RESPONDER CON FORMATO JSON
         res.json(rows); //si poner que te devuelva un array es con lo de rows
};

const getArtista = async (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
       //1. Obtener los datos del request
        const id = req.params.id;

        //2. Buscar los datos en la BD
        const [rows, fields] = await conn.query("SELECT * FROM artistas WHERE id = ?", [id]);

        //3. Respondemos en formato json
        res.json(rows[0]); //la posición 0, es porque no queres un array solo el objeto (primer elemento)
};



const createArtista = async (req, res) => {
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
    const nombre = req.body.nombre; 
    const [rows, fields] = await conn.query("INSERT INTO artistas (artistas.nombre) VALUES (?)", [nombre]);
    res.send("Se creo!"); 
};

const updateArtista = async (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */

    const id = req.params.id; 
    const nombre = req.body.nombre; 
    const [rows, fields] = await conn.query("UPDATE artistas SET artistas.nombre = ? WHERE id = ? ", [nombre, id]);
    res.send("Se actualizo!"); 
    
};

const deleteArtista = async (req, res) => {
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const id = req.params.id;
    const [rows, fields] = await conn.query("DELETE FROM artistas WHERE id = ? ", [id]);
    res.send ("Se ha eliminado correctamente");
};

const getAlbumesByArtista = async (req, res) => { //hacer al final 
    // Completar con la consulta que devuelve los albumes de un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes
    const id = req.params.id;
    const [rows, fields] = await conn.query(
        "SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes JOIN artistas ON artistas.id = albumes.artista WHERE artistas.id = ?", [id])
    res.json(rows);
};

const getCancionesByArtista = async (req, res) => { //hacer al finla
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
    const id = req.params.id;
    const [rows, fields] = await conn.query(
        "SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM albumes JOIN artistas ON artistas.id = albumes.artista JOIN canciones ON canciones.album = albumes.id WHERE artistas.id = ?", [id])    
    res.json(rows);
};

const artistas = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};

export default artistas;
