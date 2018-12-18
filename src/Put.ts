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
 */
export default async (req: Request, res: Response) => {
    let { body, params } = req
    let dirty: any = []
    let movieId = params.movieId

    if (isNaN(movieId)) {
        return res.status(400).end(JSON.stringify({ result: "error", error: "notValidMovieId" }))
    }

    if ("ageRated" in body) {
        //  Make column-friendly
        body["age_rated"] = body["ageRated"];
        delete body["ageRated"];
    }
    
    if ("imdbScore" in body) {
        //  Make column-friendly
        body["imdb_score"] = body["imdbScore"];
        delete body["imdbScore"];
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

    try {
        await query(sql, [...colToUp.map(e => dirty[e]), movieId])
    } catch (e) {
        console.log(e)

        return res.status(500).end(JSON.stringify({ result: "error", "ok": false }))
    }

    return res.status(200).end(JSON.stringify({ result: "ok", "ok": true }))
}