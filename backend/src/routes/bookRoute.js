import express from 'express'
import { bookController } from '~/controllers/bookController'
import { checkUserPermission } from '~/middlewares/checkUserPermission'
import { verifyToken } from '~/middlewares/verifyToken'

const router = express.Router()
router.get('/read', bookController.getAllBook)
router.get('/:id', bookController.getBook)
router.use(verifyToken, checkUserPermission)
router.post('/create', bookController.createBook)
router.put('/update', bookController.updateBook)
router.delete('/delete', bookController.deleteBook)
export const bookRoute = router
