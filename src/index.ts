import express from "express";


const app = express()

app.get("/",(req, res) => {
    res.end("Hi")
})

app.post('/', (req,res) => {
    res.send('POST')
})

app.put('/user', (req, res) => {
    res.send('PUT at /user')
})

app.delete('/user', (req,res) =>{
    res.send('DELETE at /user')
})