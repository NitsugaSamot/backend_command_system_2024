import express from 'express'
import { createUser, authenticate, profile } from "../controllers/loginController.js"
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/create-user', createUser)
router.post('/login', authenticate)
router.get('/profile',checkAuth, profile )

export default router