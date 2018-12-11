import express from "express";
import cors from 'cors'
import { db, setupDb } from './dataBase'

/**
 * 
 * @author Daniel Grigore
 */
const app = express()
setupDb().then(db =>{
    const baseUrl = '/api'
    app.listen(8094, () => {
        console.log("IS-ON")
    })
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.use(cors())

    app.get(`${baseUrl}/movies`, require('./Get').getMovies)
    app.get(`${baseUrl}/movie/:id`, require('./Get').getMovie)
    app.get(`${baseUrl}/movie/imdb/:imdbId`, require('./Get').getImdb)
    app.put(`${baseUrl}/movie/:movieId`, require('./Put').default)
    app.post(`${baseUrl}/movie`, require('./Post').default)
    app.delete(`${baseUrl}/movie/:movieId`, require('./Delete').default)
})

