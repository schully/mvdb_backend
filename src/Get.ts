import { Response,Request } from "express";
import { db,query } from "./dataBase";
import { fetchMovie } from "./omdbConnection";
import errorHandler from './errorHandler'
import Movie from './Movie'
import Preview from './Preview'
import util from './util'

/**
 * @author Daniel Grigore
 * @param req 
 * @param res 
 */
export const getMovie = async (req: Request, res: Response) => {
    let {id} = req.params

    try {
        let movie = await query(util.getQuery("movie"),[id],{forceArray: false}) as Movie
        if (!movie) {
            return res.status(401).end(JSON.stringify({result: 'noMatch'}))
        }
        let genre = await query(util.getQuery("movie_genre"),[id],{
            forceArray: true,
            skipObjectIfSingleResult: true
        }) as string[]

        movie.genre = genre

        res.status(200).end(JSON.stringify(movie))
    } catch (error) {
        errorHandler(res,'server',null,error)
    }
}

export const getMovies = async (req: Request, res: Response) => {
    try {
        let movies = await query(util.getQuery('movies'),null,{
            forceArray: true,
            skipObjectIfSingleResult: false
        }) as Movie[]

        movies = movies || []
        movies.forEach(mv => {
            mv.id = Number(mv.id)
        });

        res.status(200).end(JSON.stringify({
            movies
        }))
    } catch (error) {
        errorHandler(res, 'server', null, error)
    }
}

export const getImdb = async (req: Request, res: Response) => {
    let {imdbId} = req.params

    try {
        let result = await fetchMovie(imdbId)
        res.status(200).end(JSON.stringify(result))
    } catch (error) {
        errorHandler(res,'server',null,error)
    }
}