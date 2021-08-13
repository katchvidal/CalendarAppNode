const { Router } = require("express");

//  MiddleWare Express Validator para hacer Validaciones
const { check } = require("express-validator");
const { EventoExiste } = require("../helpers/databasevalidators");
const { validatejwt } = require("../middlewares/validar-jwt");
const { validate } = require("../middlewares/validate");


//  Contiene todos los controladores
const { getEventos, actualizarEvento, deleteEvento, crearEvento } = require("../controllers/evento");
const { DateValid } = require("../helpers/date");


//  Contiene toda la Funcionalidad de Router
const router = Router();


//  Path Completo -> Localhost:8080/api/evento

router.get('/', [
    
] , getEventos)

//  Todas las Rutas api/evento -> Tienen un Middleware Global
router.use( validatejwt )

router.post('/', [ 

    check(' start ').custom( DateValid ),
    check(' end ').custom( DateValid ),
    check('title', 'Title is required').not().isEmpty(),
    validate

] , crearEvento )



router.put('/:id', [

    check('id').isMongoId(),
    check('id').custom(EventoExiste),
    check(' start ').custom( DateValid ),
    check(' end ').custom( DateValid ),
    check('title', 'Title is required').not().isEmpty(),
    validate

] , actualizarEvento)

router.delete('/:id', [
    check('id').isMongoId(),
    check('id').custom(EventoExiste),
    validate
] , deleteEvento)

module.exports = router;