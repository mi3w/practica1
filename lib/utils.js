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
        let info=''
        for(let e of results){
            info+=`<a href="http://localhost:8001/${e.name}">${e.name}</a> | `
        }

        return `<html>
                    <head>
                    </head>
                    <body>
                        <h1>Lista</h1>
                        ${info}
                    </body>
                </html>`
}
    
const detalle = async (name)=>{
    let info = ''
    try{
        const data = await axios.get('https://pokeapi.co/api/v2/pokemon/'+name+'/')        
        const results = data.data.abilities
       
        for(let e of results){
            console.log(e)
             info+='<li>'+e.ability.name+'</li>'
        }

    } catch(err){
        info=`Error ${name}`
    }


        return `<html>
                    <head>
                    </head>
                    <body>
                        <h1>Abilities ${name}</h1>
                        <p>${info}</p>
                    </body>
                </html>`    
}  

module.exports = {
    obtenerArchivo, lista, detalle
}