import express from 'express'
import {createCommand, getCommands} from '../controllers/commandControllers.js'

const router = express.Router()

router.route('/')
    .post(createCommand)
    .get(getCommands)

export default router