const Yup = require('yup')
const User = require('../models/UserModel')
const { v4 } = require('uuid')

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password_hash: Yup.string().required().min(6),
      admin: Yup.boolean(),
    })

    try {
      schema.validateSync(req.body, { abortEarly: false })
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: err.errors })
    }

    const { name, email, password_hash, admin } = req.body

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    })

    return res.json({ id: user.id, name, email, admin }).status(201)
  }

  async index(req, res) {
    const users = await User.findAll()

    return res.json(users)
  }
}

module.exports = new UserController()
