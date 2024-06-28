import { conn } from "../db.js";
import { app } from "../index.js";

const getCanciones = async (_, res) => {
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
        ESTO ES UNA GRAN REQUEST 
    */ //SE HACE CON DOBLE JOIN
    const [rows, fields] = await conn.query(
        "SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM albumes JOIN artistas ON artistas.id = albumes.artista JOIN canciones ON canciones.album = albumes.id");
    res.json(rows);
};

const getCancion = async (req, res) => { //si
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
    const id = req.params.id;
    const [rows, fields] = await conn.query(
        "SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM albumes JOIN artistas ON artistas.id = albumes.artista JOIN canciones ON canciones.album = albumes.id WHERE canciones.id = ?", [id]);
    res.json(rows[0]);
};

const createCancion = async (req, res) => {
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
    const nombre = req.body.nombre; //chequear si es ? en total o uno x coso
    const album = req.body.album;
    const duracion = req.body.duracion;
    const [rows, fields] = await conn.query("INSERT INTO canciones (canciones.nombre, canciones.album, canciones.duracion) VALUES (?, ?, ?)", [nombre, album, duracion]);
    res.send("Se creo!! :)"); 
};

const updateCancion = async (req, res) => {
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)
    const id = req.params.id;  //RECONTRA CHEQUEAR
    const nombre = req.body.nombre; 
    const album = req.body.album;
    const duracion = req.body.duracion;
    const [rows, fields] = await conn.query("UPDATE canciones SET canciones.nombre = ?, canciones.album = ?, canciones.duracion = ? WHERE id = ? ", [nombre, album, duracion, id]);
    res.send("Se actualizo! :)");
};


const deleteCancion = async (req, res) => {
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const id = req.params.id;
    const [rows, fields] = await conn.query("DELETE FROM canciones WHERE id = ? ", [id]);
    res.send ("Se ha eliminado correctamente!! :)");
};

const reproducirCancion = async (req, res) => {
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
    const id = req.params.id; 
    const [rows, fields] = await conn.query(
        "UPDATE canciones SET canciones.reproducciones = (canciones.reproducciones + 1) WHERE id = ? ", [id]);
    res.send ("Se sumo una reproducción")
};

const canciones = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};

export default canciones;

