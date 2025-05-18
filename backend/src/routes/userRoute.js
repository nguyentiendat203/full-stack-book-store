import express from 'express'
import { authController } from '~/controllers/authController'
import { userController } from '~/controllers/userController'
import { checkUserPermission } from '~/middlewares/checkUserPermission'
import { multerUploadMiddleware } from '~/middlewares/multerUploadMiddleware'
import { protectRoute } from '~/middlewares/protectRoute'
import { authValidation } from '~/validations/authValidation'

const router = express.Router()

router.post('/signup', authValidation.signUp, authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/send-mail', userController.sendEmail)
router.post('/change-password', authValidation.changePassword, userController.changePassword)
router.post('/refresh-token', authController.refreshTokenAPI)

router.use(protectRoute)
router.put('/update-password', userController.updatePassword)
router.put('/update-me', multerUploadMiddleware.upload.single('avatar'), authValidation.updateUser, userController.updateMe)

router.use(checkUserPermission)
router.route('/create').post(authValidation.signUp, userController.createUser)
router.route('/read').get(userController.getAllUser)
router.route('/detail').get(userController.getUser)
router.route('/update').put(authValidation.updateUser, userController.updateUser)
router.route('/delete').delete(userController.deleteUser)

export const userRoute = router
