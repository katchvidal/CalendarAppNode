
const { Schema, model } = require('mongoose')


//  Modelo de USUARIO en Base de Datos de MongoDb
const EventoSchema = Schema({

    title : {

        type : String,
        required : [true, 'title is required'],

    },

    notes : {

        type : String,
    },

    start: {

        type : Date,
        required : true

    },

    end : {

        type : Date,
        required : true,

    },

    estado : {

        type : Boolean,
        default : true

    },

    usuario : {

        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    }

})


//  No devolver nunca los siguientes objetos de la base de datos
EventoSchema.methods.toJSON = function(){
    const {__v, _id, estado,  ... evento } = this.toObject()

    //  Modificar el nombre de un objeto por otro sin modificar la base de datos -> _id modificar por EVENTO ID (eid)
    evento.eid = _id
    
    return evento
}

module.exports = model('Evento', EventoSchema);