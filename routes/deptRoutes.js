import express from 'express'
import { getAllDeptCt } from '../controllers/deptController.js'

const router = express.Router()
router.get('/depts', getAllDeptCt)

export default router