import express from 'express'
import { createCompanyCt, findByFieldCt, updateCompanyCt } from '../controllers/companyController.js'

const router = express.Router()
router.post('/companies', createCompanyCt)
router.get('/companies', findByFieldCt)
router.put('/companies/:id', updateCompanyCt)

export default router
