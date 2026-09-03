import express from 'express'
import controller from './controller.js'

const routes = express.Router()

// inserta pelicula en la coleccion
routes.post('/pelicula', controller.handleInsertPeliculaRequest)

//trae todas las peliculas
routes.get('/peliculas', controller.handleGetPeliculasRequest)

//trae una pelicula por id
routes.get('/pelicula/:id', controller.handleGetPeliculaByIdRequest)

//actualiza una pelicula
routes.put('/pelicula/:id', controller.handleUpdatePeliculaByIdRequest)

//elimina una pelicula
routes.delete('/pelicula/:id', controller.handleDeletPeliculaByIdRequest)

//podria faltar el buscar con search

export default routes