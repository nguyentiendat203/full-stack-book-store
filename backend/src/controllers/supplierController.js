import { StatusCodes } from 'http-status-codes'
import { supplierService } from '~/services/supplierService'

const getAllSupplier = async (req, res, next) => {
  try {
    const sups = await supplierService.getAll()
    return res.status(StatusCodes.OK).json(sups)
  } catch (error) {
    next(error)
  }
}

export const supplierController = { getAllSupplier }
