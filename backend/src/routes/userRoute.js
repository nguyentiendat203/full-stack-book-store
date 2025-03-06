import express from 'express'
import { authController } from '~/controllers/authController'
import { userController } from '~/controllers/userController'
import { checkUserPermission } from '~/middlewares/checkUserPermission'
import { verifyToken } from '~/middlewares/verifyToken'
import { authValidation } from '~/validations/authValidation'

const router = express.Router()

router.post('/signup', authValidation.signUp, authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/recommend', userController.recommendSystem)
router.post('/send-mail', userController.sendEmail)
router.post('/change-password', authValidation.changePassword, userController.changePassword)

router.use(verifyToken)
router.put('/update-password', userController.updatePassword)
router.put('/update-me', authValidation.updateUser, userController.updateMe)
// --------------------ADD TO CART--------------
router.post('/add-to-cart', userController.addCartUser)
router.get('/cart-quantity/:userId', userController.countQuantityCart)
router.post('/update-cart-quantity', userController.updateCartQuantity)
router.delete('/delete-cart-item/:bookId', userController.deleteCartItem)
router.get('/my-cart', userController.getMyCart)
router.post('/order', userController.orderCart)
router.get('/orders', userController.getAllOrder)
router.put('/update-status', userController.updateStatusOrder)
router.get('/my-order', userController.getOrder)
router.get('/my-order-status/:status', userController.getOrderStatus)
router.get('/purchases', userController.getPurchases)

router.use(checkUserPermission)
router.route('/create').post(authValidation.signUp, userController.createUser)
router.route('/read').get(userController.getAllUser)
router.route('/detail').get(userController.getUser)
router.route('/update').put(authValidation.updateUser, userController.updateUser)
router.route('/delete').delete(userController.deleteUser)

export const userRoute = router
