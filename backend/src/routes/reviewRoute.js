import express from 'express'
import { reviewController } from '~/controllers/reviewController'

const router = express.Router()

router.get('/read/:bookId', reviewController.getAllReviews)
router.post('/create', reviewController.createNewReview)

export const reviewRoute = router
