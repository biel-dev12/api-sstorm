import express from 'express'
import { getTechCt } from '../controllers/techController.js'

const router = express.Router()

router.get('/techs', getTechCt)

export default router