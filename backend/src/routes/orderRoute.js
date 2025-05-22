import express from 'express'
import { orderController } from '~/controllers/orderController'
import { protectRoute } from '~/middlewares/protectRoute'

const router = express.Router()
router.use(protectRoute)
router.post('/', orderController.orderCart)
router.get('/read', orderController.getAllOrder)
router.put('/update-status', orderController.updateStatusOrder)
router.get('/my-order', orderController.getOrder)
router.get('/my-order-status/:status', orderController.getOrderStatus)
router.get('/purchases', orderController.getPurchases)
export const orderRoute = router
