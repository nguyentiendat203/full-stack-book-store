import express from 'express'
import { groupController } from '~/controllers/groupController'
import { checkUserPermission } from '~/middlewares/checkUserPermission'
import { protectRoute } from '~/middlewares/protectRoute'

const router = express.Router()

router.use(protectRoute, checkUserPermission)
router.get('/read', groupController.getAllGroup)

export const groupRoute = router
