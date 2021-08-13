const { Router } = require("express");

//  MiddleWare Express Validator para hacer Validaciones
const { check } = require("express-validator");


//  Contiene todos los controladores
const { CrearUsuario, Login } = require("../controllers/authorized");
const { AlreadyEmail, validaterol } = require("../helpers/databasevalidators");
const { validate } = require("../middlewares/validate");


//  Contiene toda la Funcionalidad de Router
const router = Router();


router.post('/CrearUsuario', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required/ Minimun six letters').isLength({min : 6}).not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Not Valid Email').isEmail(),
    check('email').custom(AlreadyEmail),
    check('rol').custom( validaterol ),
    validate
], CrearUsuario)

//  Path, MiddleWare, Controller
router.post('/login', [
    check('email', 'Email Required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validate
] ,Login)



module.exports = router;