import express from 'express'
import { createCompanyCt, findByFieldCt, updateCompanyCt, deleteCompanyCt, compByMonthCt, updateSingleAttribute } from '../controllers/companyController.js'

const router = express.Router()
router.post('/companies', createCompanyCt)
router.get('/companies', findByFieldCt)
router.put('/companies/:id', updateCompanyCt)
router.delete('/companies', deleteCompanyCt)
router.put('/upt-comp/:id', updateSingleAttribute)
router.get("/comp-month/:month", compByMonthCt)

export default router
