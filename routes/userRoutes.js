import express from 'express'
import { getUserByIdCt, getAllUsersCt } from '../controllers/userController.js'

const router = express.Router()
router.get('/user/:id', getUserByIdCt)
router.get('/users', getAllUsersCt)


export default router;