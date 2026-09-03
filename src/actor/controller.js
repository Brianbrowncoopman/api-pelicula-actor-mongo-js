import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Actor } from "./actor.js"

const actorCollection = client.db('cine-db').collection('actores')
const peliculaCollection = client.db('cine-db').collection('peliculas');



async function handleInsertActorRequest(req, res) {
    let actor = req.body;
    try {
        // 1. Validar que se envíe el nombre de la película para hacer la búsqueda
        if (!actor.nombrePelicula) {
            return res.status(400).send({ error: "Se requiere el nombre de la película para validar su existencia" });
        }

        // 2. Buscar la película en la colección basándose en su nombre
        let peliculaEncontrada = await peliculaCollection.findOne({ nombre: actor.nombrePelicula });

        if (!peliculaEncontrada) {
            return res.status(404).send({ error: "La película especificada no existe en la base de datos" });
        }

        // 3. Asignar el _id de la película encontrada a la propiedad idPelicula del actor
        actor.idPelicula = peliculaEncontrada._id;

        // Opcional: Eliminar la propiedad temporal si no forma parte del esquema del actor
        delete actor.nombrePelicula;

        // 4. Insertar el actor
        let data = await actorCollection.insertOne(actor);

        if (data === null) {
            return res.status(400).send('Error al crear actor');
        }
        return res.status(201).send(data);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}

async function handleGetActoresRequest(req, res){
    try {
        let data = await actorCollection.find({}).toArray()
        return res.status(200).send(data)
    }catch (e){
        return res.status(500).send({ error: e})
    }
}

async function handleGetActorByIdRequest(req, res){
    let id = req.params.id

    try {
        let oid = ObjectId.createFromHexString(id)
        let data = await actorCollection.findOne({_id: oid })

        if (data === null) {
            return res.status(404).send({ error: "Actor no encontrado" })
        }

        return res.status(200).send(data)
    }catch (e) {
        return res.status(400).send({ error: 'id mal formado' })
    }
}
              
async function handleGetActoresByPeliculaRequest(req, res, nex){
    // 1. Coincidir con el nombre del parámetro en routes.get('/actor/:pelicula', ...)
    let peliculaIdString = req.params.pelicula;

    try {
        // 2. Convertir el String de la URL a un ObjectId válido de MongoDB
        let peliculaOid = ObjectId.createFromHexString(peliculaIdString);

        // 3. Realizar la búsqueda con el tipo de dato correcto
        let data = await actorCollection.find({ idPelicula: peliculaOid }).toArray();

        return res.status(200).send(data);
    } catch (e) {
        // Captura el error si el ID enviado no tiene el formato válido de 24 caracteres
        return res.status(400).send({ error: "ID de película mal formado" });
    }
}



export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaRequest
}