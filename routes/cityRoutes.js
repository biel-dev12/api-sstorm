import express from 'express'
import { getCityCt } from '../controllers/cityController.js'

const router = express.Router()

router.get('/cities', getCityCt)

export default router