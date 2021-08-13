const {response} = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const {generarJwt} = require('../helpers/generateJWT')



const CrearUsuario = async(req, res = response) => {

    //  Parametros sumistrados en el BODY
    const {name, email, password , rol} = req.body;

    //  Peticiones del Body se introduce al Modelo
    const usuario = new Usuario({name, email, password , rol});

    //  Encriptar Contraseña Hash
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //  Salvar en Base de datos
    await usuario.save();

    res.json({

        message : ' Metodo Post para Creacion de Usuarios ',
        usuario

    })

}




const Login = async(req, res = response) =>{

    const {password , email} = req.body;

    try {

        //  Verificar Email
        const usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({
                msg : ' Email or Password Incorrect - Not Register '
            })
        }

        //  Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg : ' Email or Password Incorrect - Not register '
            })
        }

        //  Verficar contraseña
        const validpass = bcryptjs.compareSync(password, usuario.password)
        if(!validpass){
            return res.status(400).json({
                msg : ' email or password are incorrect - Password Incorrect '
            })
        }
        //  Generar JWT
        const token = await generarJwt(usuario.id)

        res.json({
            msg : 'Login ok',
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg : 'Talk to BackDev something Wrong'
        })
    }


}



module.exports = {

    CrearUsuario,
    Login

}