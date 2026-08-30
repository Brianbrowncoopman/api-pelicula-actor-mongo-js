import express from 'express'
import controller from './controller.js'

const routes = express.Router()

routes.post('/pelicula', controller.handleInsertPeliculaRequest)

routes.get('/peliculas', controller.handleGetPeliculasRequest)

routes.get('/pelicula/:id', controller.handleGetPeliculaByIdRequest)

routes.put('/pelicula/:id', controller.handleUpdatePeliculaByIdRequest)

routes.delete('/pelicula/:id', controller.handleDeletPeliculaByIdRequest)

//podria faltar el buscar con search

export default routes