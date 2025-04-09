import { Router } from 'express'
import { getQuejas } from '../helpers/consultaQueja.js'
import { validarJWT } from '../middlewares/validateJWS.js'
import { validateFechaRecepcionObtener } from '../middlewares/validateFueraFechaObtener.js'

const router = Router()

router.get('/redeco/quejas/', validateFechaRecepcionObtener, validarJWT, getQuejas)

export default router