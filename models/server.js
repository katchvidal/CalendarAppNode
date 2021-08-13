const express = require('express')
const cors = require('cors');
const { dbconnection } = require('../database/config');



class server{
    
    //  Aqui declaramos las propiedades de la clase
    constructor() {
        
        //  Crea Servidor
        this.app = express();

        //  Puerto del Servidor
        this.PORT = process.env.PORT


        //  Path de Rutas
        //Ruta -> CalendarApp
        this.AuthorizedPath = '/api/auth'
        this.EventoPath = '/api/evento'

        //  Conexion a Base de Datos
        this.database();

        //  Middlewares
        this.middleware();

        //  Busca Todas las Rutas Disponibles
        this.routes();

    }

    //  Metodo Conexion a Database
    async database(){

        await dbconnection();

    }


    //  Metodo de Middleware
    middleware(){

        //  Lectura y Parseo del Body
        this.app.use(express.json())

        //  CORS
        this.app.use(cors())

        //  Directorio Publico
        this.app.use(express.static('public'))


    }

    //  Metodo Rutas del Servidor Actual
    routes(){

        //  Crear Usuario 
        this.app.use(this.AuthorizedPath, require('../routes/authorized'))
        this.app.use(this.EventoPath, require('../routes/evento'))

    }

    //  Metodo Servidor y sus Paramaetros
    listen(){

        this.app.listen(this.PORT, () =>{
            console.log(`Servidor en el puerto: ` + process.env.PORT )
        })

    }

}

module.exports = server;