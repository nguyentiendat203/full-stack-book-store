import express from 'express'
import { categoryController } from '~/controllers/categoryController'

const router = express.Router()

router.get('/read', categoryController.getAllCategory)
router.get('/read-sub-categories/:parentId', categoryController.getSubCategory)

export const categoryRoute = router
