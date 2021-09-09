/* eslint space-before-function-paren: ["error", "never"] */

const sendgrid = require('@sendgrid/mail')
const Mailgen = require('mailgen')

class EmailService {
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = `http://localhost:${process.env.PORT}`
        break
      case 'production':
        this.link = 'link for production'
        break
      default:
        break
    }
  }

  createTemplateVerifyEmail(verifyToken, name) {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'System users',
        link: this.link
      }
    })
    const email = {
      body: {
        name,
        intro: "Welcome to Mailgen! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with system users, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`
          }
        }
      }
    }
    const emailBody = mailGenerator.generate(email)
    return emailBody
  }

  async sendVerifyEmail(verifyToken, email, name) {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: email,
      from: 'alexandr.tischenko.devs@gmail.com',
      subject: 'Verify email',
      html: this.createTemplateVerifyEmail(verifyToken, name)
    }
    sendgrid.send(msg)
  }
}

module.exports = EmailService
