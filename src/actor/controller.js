import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Actor } from "./actor.js"

const actorCollection = client.db('cine-db').collection('actores')

async function handleInsertActorRequest(req,res){
    let actor = req.body
    try {
        let data = await actorCollection.insertOne(actor)

        if(data === null) {
            return res.status(400).send('Error al crear actor')
        }
        return res.status(201).send(data)
    } catch (e){
        return res.status(500).send({ error: e.message})
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

async function handleGetActoresByPeliculaIdRequest(req, res){
    let peliculaId = req.params.id

    try {
        let data = await actorCollection.find({ idPelicula: peliculaId }).toArray()

        return res.status(200).send(data)
    }catch (e){
        return res.status(500).send({ error: e.message })
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
}