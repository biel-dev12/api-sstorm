import express from 'express'
import { createCompanyCt } from '../controllers/companyController.js'

const router = express.Router()
router.post('/companies', createCompanyCt)

export default router
