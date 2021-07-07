/* eslint space-before-function-paren: ["error", "never"] */

class CustomErr extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
    this.message = message
  }
}

module.exports = {
  CustomErr
}
