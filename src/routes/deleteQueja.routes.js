import { Router } from 'express'
import { deleteQueja } from '../helpers/deleteQueja.js'
import { validarJWT } from '../middlewares/validateJWS.js'
import { validateFechaRecepcionDelete } from '../middlewares/validateFueraFechaDelete.js'
import { validateAcuseDelete } from '../middlewares/validateAcuseDelete.js'

const router = Router()

//router.delete('/redeco/quejas/', validateFechaRecepcionDelete, validarJWT, deleteQueja)


router.delete('/redeco/quejas/', validateFechaRecepcionDelete, validarJWT, validateAcuseDelete, deleteQueja)

export default router