import express from 'express'
import { getUserByIdCt, getAllUsersCt, createUserCt } from '../controllers/userController.js'

const router = express.Router()
router.get('/user/:id', getUserByIdCt)
router.get('/users', getAllUsersCt)
router.post('/users', createUserCt)


export default router;