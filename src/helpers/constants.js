const path = require('path')
const Status = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  SEE_OTHER: 303,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
}

const avatarStorage = {
  TEMPRORARY: path.join(process.cwd(), process.env.TMP_DIR),
  PERMANENT: path.join(process.cwd(), 'public', process.env.IMAGE_DIR)
}

module.exports = {
  Status,
  avatarStorage
}
