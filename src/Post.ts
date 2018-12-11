import { Request, Response, json } from "express";
import utils from './util'
import { fetchMovie } from './omdbConnection'
import Movie, { convertRatingValue } from './Movie'
import IdFromImdb from './IdFromImdb'
import { query } from "./dataBase";
import errorHandler from './errorHandler'


const validate = (movie: Movie): string | true => {


    if ((movie.runtime <= 5)) {
        return "To short for a movie"
    }

    if ((movie.title || "").length < 2) {
        return "You sure? Cause I am sure you are wrong..."
    }

    if (!Array.isArray(movie.genre) || !movie.genre.length) {
        return "Not valid genre"
    }

    return true
}

const insertGenre = async (movie: Movie) => {
    let genre = movie.genre.map(c => c.trim().toString())

    let genreId;

    for (let g of genre) {
        genreId = ((await query(
            utils.getQuery("genre"), [g], {
                forceArray: false,
                skipObjectIfSingleResult: true
            }
        ) as any) || {}).id
        console.log("Existing Grenre ID: ", genreId);
        
        if (!genreId) {
            genreId = (await query(
                utils.getQuery("insert_genre"), [g]
            ) as any).insertId
            console.log("Inserted genre ID: ", genreId);
        }

        console.log("Genre id: ", genreId, "movie id: ", movie.id);
        

        await query(
            `UPDATE movies SET genre_id = ? WHERE id = ?`,
            [genreId, movie.id]
        );

        break;
    }
    movie.genre = genre
}

const insertMovie = async (movie: Movie) => {
    console.log("hlo im ins 1", movie);
    
    let { insertId } = await query(
        utils.getQuery("insert_movie"),
        [movie.title, movie.imdbScore, movie.runtime, movie.plot, movie.ageRated, movie.possessor ||'']
    ) as any
    let movieId = insertId
    movie.id = movieId
}

/**
 * @author Daniel Grigore
 * @param req 
 * @param res 
 */
export default async (req: Request, res: Response) => {
    let { param, body } = req
    let addByImdbId = 'imdb_id' in body
    let result: Movie

    console.log(body);


    if (addByImdbId) {
        let imdbMovie: IdFromImdb = result = new IdFromImdb()
        imdbMovie.imdbId = body.imdb_id

        let fetched = (await fetchMovie(imdbMovie.imdbId)).result as IdFromImdb

    } else {
        result = new Movie()
    }

    console.log(body);
    

    result.title = body.title
    result.runtime = parseInt(body.runtime)
    result.plot = body.plot
    result.ageRated = convertRatingValue(body.ageRated)
    result.imdbScore = (body.imdbScore)
    result.genre = (body.genre || "").split(",")
    result.possessor = body.possessor;

    let validationError;
    if ((validationError = validate(result)) !== true) {
        return res.status(400).end(JSON.stringify({ validationError }))
    }

    try {
        if (addByImdbId) {
            let imdbMovie = (await fetchMovie(body.imdb_id)).result as IdFromImdb

            for (let field in Movie.prototype) {
                if (result[field] == null) {
                    result[field] = imdbMovie[field]
                }
            }
        }
    } catch (error) {
        if (error.result == 'noMatch') {
            return errorHandler(res, 'client', error)
        } else {
            return errorHandler(res, 'server', null, error)
        }
    }

    try {
        await insertMovie(result)
        let movieId = result.id

        await insertGenre(result)

        return res.status(200).end(JSON.stringify({ "ok": true, "movie_id": movieId }))
    } catch (error) {
        errorHandler(res, 'server', null, error)
    }
}