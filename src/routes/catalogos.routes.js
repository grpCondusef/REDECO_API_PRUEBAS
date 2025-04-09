import { Router } from 'express'
import { getCausasList, getInstitucionesFinancieras, getMediosDeRecepcion, getNivelesDeAtencion, getProducts} from '../controllers/catalogos.controllers.js'
import { validarJWT } from '../middlewares/validateJWS.js'

const router = Router()

router.get('/catalogos/instituciones', getInstitucionesFinancieras)
router.get('/catalogos/products-list', validarJWT, getProducts)
router.get('/catalogos/causas-list/', validarJWT, getCausasList)
router.get('/catalogos/medio-recepcion', getMediosDeRecepcion)
router.get('/catalogos/niveles-atencion', getNivelesDeAtencion)

export default router