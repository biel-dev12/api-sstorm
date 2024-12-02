import express from 'express'
import { getAllSegmentCt } from '../controllers/segmentController.js'

const router = express.Router()

router.get('/segments', getAllSegmentCt)

export default router