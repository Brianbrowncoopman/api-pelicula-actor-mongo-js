import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Pelicula } from "./pelicula.js";

const peliculaCollection = client.db('cine-db').collection('peliculas')

async function handleInsertPeliculaRequest(req, res){
    let pelicula = req.body 
    try {
        let data = await peliculaCollection.insertOne(pelicula)
        
        if(data === null) {
            return res.status(400).send('Error al guardar la pelicula')
        }
        
        return res.status(201).send(data)
    } catch (e) {
        return res.status(500).send({ error: e.message })
    }
}

async function handleGetPeliculasRequest(req, res){
    try {
        let data = await peliculaCollection.find({}).toArray()
        return res.status(200).send(data)
    } catch (e) {
        return res.status(500).send({ error: e })
    }
}

async function handleGetPeliculaByIdRequest(req, res) {
    let id = req.params.id

    try {
        let oid = ObjectId.createFromHexString(id)
        let data = await peliculaCollection.findOne({ _id: oid })
        
        if (data === null) {
            return res.status(404).send({ error: "Película no encontrada" })
        }

        return res.status(200).send(data)
    } catch (e) {
        return res.status(400).send({ error: 'Id mal formado' })
    }
}

async function handleUpdatePeliculaByIdRequest(req, res) {
    let id = req.params.id
    let pelicula = req.body

    try {
        let oid = ObjectId.createFromHexString(id)
        let query = { $set: pelicula }

        let data = await peliculaCollection.updateOne({ _id: oid }, query) // Corregido el nombre de la colección
        return res.status(200).send(data)
    } catch (error) {
        return res.status(400).send({ error: 'Id mal formado o error en actualización' })
    }
}

async function handleDeletPeliculaByIdRequest(req, res){
    let id = req.params.id

    try {
        let oid = ObjectId.createFromHexString(id)
        let data = await peliculaCollection.deleteOne({ _id: oid })
        return res.status(200).send(data)
    } catch (error) {
        return res.status(400).send({ error: 'Id mal formado' })
    }
}

export default {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletPeliculaByIdRequest
}

