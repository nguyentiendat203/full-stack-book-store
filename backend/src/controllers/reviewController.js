import { StatusCodes } from 'http-status-codes'
import { reviewService } from '~/services/reviewService'

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAll(req.params.bookId)
    return res.status(StatusCodes.OK).json(reviews)
  } catch (error) {
    next(error)
  }
}

const createNewReview = async (req, res, next) => {
  try {
    const review = await reviewService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json(review)
  } catch (error) {
    next(error)
  }
}

export const reviewController = { getAllReviews, createNewReview }
