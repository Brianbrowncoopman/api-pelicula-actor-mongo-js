import express from 'express'
import controller from './controller.js'

const routes = express.Router()

// Crear actor
routes.post('/actor', controller.handleInsertActorRequest)

// Traer todos los actores
routes.get('/actores', controller.handleGetActoresRequest)

// Traer actor por _id
routes.get('/actor/:id', controller.handleGetActorByIdRequest)

// Traer actores de película 
// este cambio de ruta lo genere porque ('/actor/:pelicula') me traia confusion al buscar por el id de la pelicula postman no me dejaba con esta ruta
routes.get('/actor/pelicula/:pelicula', controller.handleGetActoresByPeliculaRequest)

export default routes