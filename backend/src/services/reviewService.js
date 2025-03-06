import db from '~/models'

const getAll = (bookId) => {
  try {
    return db.Review.findAll({
      where: { bookId },
      include: [{ model: db.Book }, { model: db.User, attributes: { exclude: ['password'] } }]
    })
  } catch (error) {
    throw error
  }
}

const createNew = async (reqBody) => {
  try {
    await db.Review.create(reqBody)
    const allReviews = await db.Review.findAll({
      where: {
        bookId: reqBody.bookId
      }
    })

    let countReviews = 0
    let sumRating = 0
    allReviews.forEach((element) => {
      countReviews += 1
      sumRating += element.rate
    })
    const ratingAverage = sumRating / countReviews

    await db.Book.update(
      {
        totalRating: countReviews,
        ratingsAverage: Math.round(ratingAverage * 10) / 10
      },
      {
        where: { id: reqBody.bookId }
      }
    )

    const book = await db.Book.findOne({ where: { id: reqBody.bookId } })
    return { book, allReviews }
  } catch (error) {
    throw error
  }
}

export const reviewService = { getAll, createNew }
