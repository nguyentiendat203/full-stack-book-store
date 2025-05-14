import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import ApiError from '~/utils/ApiError'
import { ALLOW_FILE_TYPES } from '~/utils/constants'

const fileFilter = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:

  if (!ALLOW_FILE_TYPES.includes(file.mimetype)) return cb(new ApiError(StatusCodes.BAD_REQUEST, 'Only accept .jpeg, .png and .jpg'))

  // To accept the file pass `true`, like so:
  return cb(null, true)
}

const upload = multer({ fileFilter, limits: { fieldSize: 10000000 } })

export const multerUploadMiddleware = { upload }
