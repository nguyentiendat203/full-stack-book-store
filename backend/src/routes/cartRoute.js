import express from 'express'
import { cartController } from '~/controllers/cartController'
import { protectRoute } from '~/middlewares/protectRoute'

const router = express.Router()
router.use(protectRoute)
router.post('/add-to-cart', cartController.addCartUser)
router.get('/cart-quantity', cartController.countQuantityCart)
router.put('/update-cart-quantity', cartController.updateCartQuantity)
router.delete('/delete-cart-item/:bookId', cartController.deleteCartItem)
router.get('/my-cart', cartController.getMyCart)
export const cartRoute = router
