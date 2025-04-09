import express from 'express';
import { addQuejas } from '../controllers/quejas.controllers.js';
import { validarJWT } from '../middlewares/validateJWS.js';
import { validateErrors } from '../middlewares/quejas/index.js';
import { validateFechaRecepcion } from '../middlewares/validateFueraDeFecha.js'
import { validateAcuse } from '../middlewares/validateAcuse.js'

const router = express.Router();

router.post('/redeco/quejas', validateFechaRecepcion, validarJWT, validateAcuse, validateErrors, addQuejas)

export default router;
