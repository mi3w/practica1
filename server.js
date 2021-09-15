//express

const express = require('express')
const http = require('http')

const {lista, detalle} = require('./lib/utils')

const app = express()
//app.use(express.json())

//pokeapi.com
app.set('view engine','ejs')

app.get('/', async (req,res)=>{
    try{
        const result = await lista()
        res.status(200).send(result)    
    } catch(err){
        res.send(err)
    }
})

app.get('/:name', async (req,res)=>{
    try{
        const {name} = req.params   
        const result = await detalle(name)
        res.status(200).send(result)    
    }catch(err){
        res.send(err)
    }
})

http.createServer(app).listen(8001,()=>{
    console.log('Escuchando puerto 8001')
})