import express from 'express'
import { getTechByIdCt, getTechCt } from '../controllers/techController.js'

const router = express.Router()

router.get('/techs', getTechCt)
router.get('/tech/:id', getTechByIdCt)

export default router