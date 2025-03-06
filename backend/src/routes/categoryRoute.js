import express from 'express'
import { categoryController } from '~/controllers/categoryController'

const router = express.Router()

router.get('/read', categoryController.getAllCategory)

export const categoryRoute = router
