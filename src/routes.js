const { Router } = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const RecipeController = require('./app/controllers/RecipeController')

const routes = new Router()
const upload = multer(multerConfig)

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World !' })
})

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)
routes.post('/recipes', RecipeController.store)
routes.post('/recipes/:id', RecipeController.update)
routes.post('/recipes', upload.single('image'), RecipeController.store)
routes.get('/users', UserController.index)
routes.get('/recipes', RecipeController.index)
routes.get('/recipes/:id', RecipeController.show)
routes.put('/recipes/:id', RecipeController.update)
routes.delete('/recipes/:id', RecipeController.delete)

module.exports = routes