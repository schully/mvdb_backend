import fetch from "node-fetch";
import express from "express";
import mysql from "mysql"

const app = express()
const baseUrl = 'http://www.omdbapi.com/?apikey=3227a5fa&i='

const connection = mysql.createConnection({
    host:   'localhost',
    user:   'root',
    database:   'movie_database'
})

connection.connect((err) => {
    if(err){
        console.error('error: '+err.stack)
        return;
    }
    console.log('COnnectedBoi')

})

function query(sql){
    connection.query(sql, (err, rows) =>{
        if (err) throw err
    
        console.log('DataResiecevdMan')
        console.log(rows);
        
    })
    
}

connection.end((err) => {

})

app.get("/movie/imdb/:id", (req,res) => {
    fetch(baseUrl+req.params.id).then(res => res.json()).then(json => {
        res.end(JSON.stringify(Movie.fromImdbMovie(json)))
    })

})

app.post("/movie/imdb", (req,res) => {
    res.end('')
})

app.listen(8083)

export default app



class Movie {
    title: string
    ageRated: number
    imdbScore?: number
    director?: string
    genre: string
    plot?: string
    possessor?: string

    static fromImdbMovie(json): Movie{
        return {
            title: json.Title,
            ageRated: json.Rated,
            imdbScore: json.imdbRating,
            director: json.Director,
            genre: json.Genre,
            possessor: undefined
        }

    }
}