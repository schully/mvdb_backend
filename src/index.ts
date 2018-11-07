import fetch from "node-fetch";
import express from "express";
import Movie from "./Movie"
import mysql from "mysql"

const app = express()

const baseUrl = 'http://www.omdbapi.com/?apikey=3227a5fa&i='


const connection = mysql.createConnection({
    host:   'localhost',
    user:   'root',
    database:   'snacksis'
})

connection.connect((err) => {
    if(err){
        console.error('error: '+err.stack)
        return;
    }

})

function query(sql, values?: any[]){
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, rows) =>{
            if (err) reject(err)

            resolve(rows)
            console.log('DataResiecevdMan')
            console.log(rows);      
        })
    })
}

app.get("/movie/imdb/:id", (req,res) => {
    
    fetch(baseUrl+req.params.id).then(res => res.json()).then(json => {
        res.end(JSON.stringify(Movie.fromImdbMovie(json)))
    })

})


app.post("/movie/imdb", async (req,res) => {
    let mta = ['The Ten Commandments','G']
    let md = ['Cecil B. DeMille']
    let mis = ['7.9']
    let mg1 = ['Adventure']
    let mg2 = ['Drama']
    let sqlM = 'INSERT INTO movies (title,age_rated) VALUES (?, ?);'
    let sqlD = 'INSERT INTO director (name) VALUES (?);'
    let sqlI = 'INSERT INTO from_imdb (imdb_score) VALUES (?);'
    let sqlG = 'INSERT INTO genres (name) VALUES (?);'

    try {
        // await waits for reolve to continue
        await query(sqlM,mta)
        await query(sqlD,md)
        await query(sqlG,mg1)
        await query(sqlI,mis)
        await query(sqlG,mg2)
    } catch (e){
        console.log(e)
    }
    res.end(JSON.stringify({
        status: "ok"
    }))
})


app.listen(8094, () => {
    console.log("ISON")
})

export default app
