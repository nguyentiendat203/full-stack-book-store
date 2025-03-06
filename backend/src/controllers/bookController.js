import { StatusCodes } from 'http-status-codes'
import { bookService } from '~/services/bookService'

const createBook = async (req, res, next) => {
  try {
    await bookService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Book has successfully created' })
  } catch (error) {
    next(error)
  }
}
const getAllBook = async (req, res, next) => {
  try {
    const books = await bookService.getAll(req.query)
    return res.status(StatusCodes.OK).json(books)
  } catch (error) {
    next(error)
  }
}

const getBook = async (req, res, next) => {
  try {
    const book = await bookService.getDetail(req.params.id)
    return res.status(StatusCodes.OK).json(book)
  } catch (error) {
    next(error)
  }
}

const updateBook = async (req, res, next) => {
  try {
    await bookService.updateDetail(req.body)
    return res.status(StatusCodes.OK).json({ message: 'Book has successfully updated' })
  } catch (error) {
    next(error)
  }
}

const deleteBook = async (req, res, next) => {
  try {
    await bookService.deleteDetail(req.query.id)
    return res.status(StatusCodes.OK).json({ message: 'Successfully' })
  } catch (error) {
    next(error)
  }
}

export const bookController = { createBook, getAllBook, getBook, updateBook, deleteBook }
