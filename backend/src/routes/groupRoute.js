import express from 'express'
import { groupController } from '~/controllers/groupController'
import { checkUserPermission } from '~/middlewares/checkUserPermission'
import { verifyToken } from '~/middlewares/verifyToken'

const router = express.Router()

router.use(verifyToken, checkUserPermission)
router.get('/read', groupController.getAllGroup)

export const groupRoute = router
