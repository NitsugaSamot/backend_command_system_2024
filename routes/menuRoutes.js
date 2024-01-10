import express from 'express'
import {createMenu ,getMenu, getMenuById, updateMenu, deleteMenu, getCategories,getMenuByCategory} from '../controllers/menuController.js'

const router = express.Router()

router.get('/categories', getCategories);
router.get('/categories/:category', getMenuByCategory)

router.route('/')
    .post(createMenu)
    .get(getMenu)

router.route('/:id')
    .get(getMenuById)
    .put(updateMenu)
    .delete(deleteMenu)


    
export default router