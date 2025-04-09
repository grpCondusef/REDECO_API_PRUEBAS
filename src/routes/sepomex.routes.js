import { Router } from 'express'
import { getCodigosPostales, getColonias, getEstados, getMunicipiosEstado } from '../controllers/sepomex.controllers.js'

const router = Router()

router.get('/sepomex/estados', getEstados)
router.get('/sepomex/codigos-postales/', getCodigosPostales)
router.get('/sepomex/municipios/', getMunicipiosEstado)
router.get('/sepomex/colonias/', getColonias)

export default router