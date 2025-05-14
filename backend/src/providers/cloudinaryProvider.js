import { v2 as cloudinary } from 'cloudinary'
import { env } from '~/config/environment'

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
})

const uploadSteamImage = (bufferImg) => {
  return new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream({ folder: 'book-store' }, (error, uploadResult) => {
        return resolve(uploadResult)
      })
      .end(bufferImg)
  })
}

export const cloudinaryProvider = { uploadSteamImage }
