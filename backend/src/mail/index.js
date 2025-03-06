import { env } from '~/config/environment'
const nodemailer = require('nodemailer')

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  ssl: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS
  }
})

export const mailOptions = (email, code) => {
  return {
    to: email,
    subject: 'CodeID to confirm password',
    text: code
  }
}
