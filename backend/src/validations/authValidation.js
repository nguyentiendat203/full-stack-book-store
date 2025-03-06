import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const signUp = async (req, res, next) => {
  const correctCondition = Joi.object({
    firstName: Joi.string().required().messages({
      'any.required': 'Họ tên không được trống',
      'string.empty': 'Họ tên không được trống',
      'string.base': 'Họ tên không được nhập số'
    }),
    lastName: Joi.string().required().messages({
      'any.required': 'Tên không được trống',
      'string.empty': 'Tên không được trống',
      'string.base': 'Tên không được nhập số'
    }),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .messages({
        'any.required': 'Email không được trống',
        'string.empty': 'Email không được trống',
        'string.base': 'Email không được nhập số',
        'string.email': 'Email phải có định dạng : Example@gmail.com',
        'string.trim': 'Email không được chứa khoảng trắng'
      })
      .trim(),
    password: Joi.string()
      .required()
      .min(6)
      .pattern(new RegExp('(?=.*[A-Z])')) // Ít nhất một ký tự hoa
      .pattern(new RegExp('(?=.*[0-9])')) // Ít nhất một chữ số
      .pattern(new RegExp('(?=.*[!@#$%^&*])')) // Ít nhất một ký tự đặc biệt
      .messages({
        'any.required': 'Mật khẩu không được trống',
        'string.empty': 'Mật khẩu không được trống',
        'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
        'string.trim': 'Mật khẩu không được chứa khoảng trắng',
        'string.pattern.base': 'Mật khẩu phải chứa ít nhất một ký tự hoa, một số và một ký tự đặc biệt'
      })
      .trim()
      .strict()
  }).unknown()

  try {
    await correctCondition.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message))
  }
}

const updateUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    firstName: Joi.string().pattern(new RegExp('^([^0-9]*)$')).messages({
      'string.pattern.base': 'Họ không được có chữ số'
    }),
    lastName: Joi.string().pattern(new RegExp('^([^0-9]*)$')).messages({
      'string.pattern.base': 'Tên không được có chữ số'
    }),
    email: Joi.string()
      .optional()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .messages({
        'string.base': 'Email không được nhập số',
        'string.email': 'Email phải có định dạng : Example@gmail.com',
        'string.trim': 'Email không được chứa khoảng trắng'
      })
      .trim(),
    phone: Joi.string().optional().max(11).pattern(new RegExp('^[0-9]*$')).messages({
      'string.max': 'Số điện thoại không vượt 11 ký tự',
      'string.pattern.base': 'Số điện thoại không chứa chữ cái'
    })
  }).unknown()

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false }) // Tiếp tục validate tất cả các trường
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message))
  }
}

const changePassword = async (req, res, next) => {
  const correctCondition = Joi.object({
    password: Joi.string()
      .required()
      .min(6)
      .pattern(new RegExp('(?=.*[A-Z])')) // Ít nhất một ký tự hoa
      .pattern(new RegExp('(?=.*[0-9])')) // Ít nhất một chữ số
      .pattern(new RegExp('(?=.*[!@#$%^&*])')) // Ít nhất một ký tự đặc biệt
      .messages({
        'any.required': 'Mật khẩu không được trống',
        'string.empty': 'Mật khẩu không được trống',
        'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
        'string.trim': 'Mật khẩu không được chứa khoảng trắng',
        'string.pattern.base': 'Mật khẩu phải chứa ít nhất một ký tự hoa, một số và một ký tự đặc biệt'
      })
      .trim()
      .strict()
  }).unknown()

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message))
  }
}

export const authValidation = { signUp, updateUser, changePassword }
