import express from 'express'
import { supplierController } from '~/controllers/supplierController'

const router = express.Router()

router.get('/read', supplierController.getAllSupplier)

export const supplierRoute = router
