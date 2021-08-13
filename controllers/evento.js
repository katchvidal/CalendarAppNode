const { response } = require("express");
const Evento = require('../models/evento')


const getEventos = async(req, res = response) => {

    //  Argumentos Opcionales del Query
    const {limit = 2, since = 0} = req.query

    //  Devuelve un query
    const [Total, Eventos] = await Promise.all([
        Evento.countDocuments({estado : true}),
        Evento.find({estado : true})
            .populate('usuario', 'name rol')
            .skip(Number(since))
            .limit(Number(limit))
    ])

    res.json({

        msg: 'Controlador GET de Eventos',
        Total,
        Eventos

    })

}


const crearEvento = async(req, res = response) => {

    //  Nombre recibido en el Body
    const { estado , usuario , ...body } = req.body

    //  Buscalo en la base de datos
    const eventoDB = await Evento.findOne({  title : body.title })


    //  Si ya existe....
    if ( eventoDB ){

        return res.status(400).json({

            msg : `El producto ${ eventoDB.title } ya existe `

        })
    }

    //  Generar la data a guardar
    const data = {

        ...body,

        title : body.title.toUpperCase(),

        notes : body.notes.toUpperCase(),

        //  El modelo de usuario lo regresamos como user en modelos de usuarios linea 58
        usuario : req.usuario._id,

    }

    const evento = new Evento( data )

    //  Guardar DB
    await evento.save()

    res.status(201).json( evento )

}



const actualizarEvento = async(req, res = response ) => {

    //  Recibir Parametros
    const {id} = req.params;

    //  Parametros que excluimos y cuales si apuntamos
    const { _id, estado,  ...data } = req.body

    //  Busca el ID y con los datos actualizalos
    const evento = await Evento.findByIdAndUpdate(id , data , { new : true } ).populate('usuario' , 'name rol')

    res.json({

        mensage : ' Actualizacion de Usuario ',
        evento

    })

}


const deleteEvento = async(req, res = response )=>{

    const {id} = req.params

    const evento = await Evento.findByIdAndUpdate( id , { estado : false }, { new : true } )

    res.status(200).json( evento )

}


module.exports = {

    getEventos,
    crearEvento,
    actualizarEvento,
    deleteEvento

}