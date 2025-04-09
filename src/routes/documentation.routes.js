import { Router } from 'express'
import { getApiHome, getGral, getSeguros, getSics } from '../controllers/documentation.controllers.js'

const router = Router()

router.get('/', getApiHome)
router.get('/pdfgral', getGral)
router.get('/pdfseguros', getSeguros)
router.get('/pdfsics', getSics)
export default router