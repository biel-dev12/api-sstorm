import express from 'express'
import { getTypeServiceByIdCt, getTypeServiceCt } from '../controllers/typeServiceController.js'

const router = express.Router()

router.get('/tservices', getTypeServiceCt)
router.get('/tservice/:id', getTypeServiceByIdCt)

export default router