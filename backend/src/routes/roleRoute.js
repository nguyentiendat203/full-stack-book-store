import express from 'express'
import { roleController } from '~/controllers/roleController'
import { checkUserPermission } from '~/middlewares/checkUserPermission'
import { verifyToken } from '~/middlewares/verifyToken'

const router = express.Router()

router.use(verifyToken, checkUserPermission)
router.post('/create', roleController.createRoles)
router.get('/read', roleController.getAllRoles)
router.delete('/delete', roleController.deleteRole)
router.put('/update', roleController.updateRole)
router.get('/by-group/:groupId', roleController.getRoleByGroup)
router.post('/assign-role-group', roleController.assignRoleToGroup)

export const roleRoute = router
