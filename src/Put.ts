import { Request, Response } from "express";
import { query } from "./dataBase";

let upColumn = [
    "title",
    "runtime",
    "age_rated",
    "imdb_score",
    "plot",
    "possessor",
]

/**
 * @author Daniel Grigore
 * @param req 
 * @param res 
 */
export default async (req: Request, res: Response) => {
    let { body, params } = req
    let dirty: any = []
    let movieId = params.movieId

    if (isNaN(movieId)) {
        return res.status(400).end(JSON.stringify({ result: "error", error: "notValidMovieId" }))
    }

    for (let column of upColumn) {
        if (body[column]) {
            dirty[column] = body[column]
        }

        console.log("col", column);
    }

    console.log("body", body);
    console.log("dirty", dirty);


    let colToUp = Object.keys(dirty)

    if (Object.keys(colToUp).length == 0) {
        return res.status(400).end(JSON.stringify({ result: "error", error: "noChange" }))
    }

    let sql = (`UPDATE movies SET ${colToUp.map(e => `${e}=?`).join(",")} WHERE id = ?`)

    let result = await query(sql, [...colToUp.map(e => dirty[e]), movieId])

    return res.status(200).end(JSON.stringify({ result: "ok", "ok": true }))
}