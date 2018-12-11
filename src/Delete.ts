import { Request, Response } from 'express'
import { query } from "./dataBase"
import util from './util';

/**
 * @author Daniel Grigore
 * @param req 
 * @param res 
 */
export default async (req: Request, res: Response) => {
    let {params} = req
    let movieId = params.movieId
    if (isNaN(movieId)) {
        return res.status(400).end(JSON.stringify({result: "error", error: "NotValidMovieId"}))
    }

    let result = await query(util.getQuery("delete_movie"), [movieId])

    res.status(200).end(JSON.stringify({status: "ok"}))
}