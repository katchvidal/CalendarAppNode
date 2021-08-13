const moment = require('moment')


const DateValid = ( value ) => {

    if ( value ) {
        return false
    }

    const fecha = moment( value )

    if (fecha.isValid()){

        return true

    } else {

        return false

    }
}


module.exports = {
    DateValid
}