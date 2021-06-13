const express = require('express')
const router = new express.Router()

const {
  addPostValidation,
  patchPostValidation
} = require('../middlewares/validationMiddleware')
const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost
} = require('../controllers/postsController')

router.get('/', getPosts)
router.get('/:id', getPostById)
router.post('/', addPostValidation, addPost)
router.put('/:id', addPostValidation, changePost)
router.patch('/:id', patchPostValidation, patchPost)
router.delete('/:id', deletePost)

module.exports = { postsRouter: router }
