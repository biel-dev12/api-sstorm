import express from 'express'
import { getTypeServiceCt } from '../controllers/typeServiceController.js'

const router = express.Router()

router.get('/tservices', getTypeServiceCt)

export default router