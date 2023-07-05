const { User } = require('../models/UserModel')
const Yup = require('yup')

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const userEmailOrPasswordIncorrect = () => {
      return res
        .status(401)
        .json({ error: 'Digite um email ou senha valida!' })
    }

    if (!(await schema.isValid(req.body))) return userEmailOrPasswordIncorrect()

    const { email, password } = req.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) return userEmailOrPasswordIncorrect()

    if (!(await user.checkPassword(password)))
      return userEmailOrPasswordIncorrect()

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    })
  }
}

module.exports = new SessionController()
