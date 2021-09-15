const axios = require('axios')
const fs = require('fs')

//retorna la primera y unica instrucción
const obtenerArchivo = (path)=>
    new Promise((resolve, reject)=>{
        fs.readFile(path,(err,info)=>{
            if(err){reject(err)}
            resolve(info)
        })
    })

const lista = async ()=>{
        const {data:{results}} = await axios.get('https://pokeapi.co/api/v2/pokemon')
        //const lst='Pendiente'
        const lst=results.reduce((prev,actual)=>{
            return (typeof prev === 'string' ? prev : '') +`<a href="http://localhost:8001/${actual.name}">${actual.name}</a> | `
        })

        return `<html>
                    <head>
                    </head>
                    <body>
                        <h1>Lista</h1>
                        ${lst}
                    </body>
                </html>`
}
    
const detalle = async (name)=>{
        const data = await axios.get('https://pokeapi.co/api/v2/pokemon/'+name+'/')    
        
        const info = JSON.strinfy(data.data)

        return `<html>
                    <head>
                    </head>
                    <body>
                        <h1>Detalle ${name}**</h1>
                        <p>${info}</p>
                    </body>
                </html>`    
}  

module.exports = {
    obtenerArchivo, lista, detalle
}