import { conn } from "../db.js";

const getAlbumes = async (_, res) => {
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
    SELECT id, nombre, artistas.nombre AS nombre_artista // LO ESCRIBI YO (BELU)
    FROM ... JOIN ... ON... // LO ESCRIBI YO (BELU)
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista" //PIDE EL NOMBRE DEL ART, NO EL ID DEL ART 
                (SE HACE UN JOIN, PARA JUNTAR LAS 2 TABLAS)
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
        const [rows, fields] = await conn.query("SELECT (albumes.id, albumes.nombre, artistas.nombre AS nombre_artista) FROM albumes JOIN artistas ON artistas.id = album.artista"); //check
        res.json(rows);

};

const getAlbum = async (req, res) => {
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }

    LO MISMO Q CON LO DE ANTES SOLO QUE CON EL WHERE, Y PONER LA POSICIÓN EN 0
    */

    const id = req.params.id; //check
    const [rows, fields] = await conn.query("SELECT (albumes.id, albumes.nombre, artistas.nombre AS nombre_artista) FROM albumes JOIN artistas ON artistas.id = album.artista WHERE id = ?", [id]);
    res.json(rows[0]); //la posición 0, es porque no queres un array solo el objeto (primer elemento)
};

const createAlbum = async (req, res) => {
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */

        const nombre = req.body.nombre; //chequear
        const idartista = req.body.idartista;
        const [rows, fields] = await conn.query("INSERT INTO albumes (albumes.nombre, albumes.idartista) VALUES (? , ?)", [nombre, idartista]);
        res.send("Se creo! :)"); 
};

const updateAlbum = async (req, res) => {
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
        const id = req.params.id;  //RECONTRA CHEQUEAR
        const nombre = req.body.nombre; 
        const idartista = req.body.idartista;
        const [rows, fields] = await conn.query("UPDATE albumes SET albumes.nombre = ?, albumes.idartista = ? WHERE id = ? ", [nombre, id, idartista]);
        res.send("Se actualizo! :)"); 
};

const deleteAlbum = async (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const [rows, fields] = await conn.query("DELETE FROM albumes WHERE id = ? ", [id]);
    res.send ("Se ha eliminado correctamente! :)");
};

const getCancionesByAlbum = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;
