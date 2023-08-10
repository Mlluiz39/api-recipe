const yup = require('yup')
const Recipe = require('../models/RecipeModel')

class RecipeController {
  async index(req, res) {
    const recipes = await Recipe.findAll()

    return res.json(recipes)
  }

  async show(req, res) {
    const { id } = req.params

    const recipe = await Recipe.findByPk(id)

    return res.json(recipe)
  }

  async store(req, res) {
    const schema = yup.object().shape({
      recipe_name: yup.string().required(),
      ingredients: yup.string().required(),
      preparation: yup.string().required(),
      preparation_time: yup.string().required(),
      income: yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação!' })
    }

    const recipe = await Recipe.create(req.body)

    return res.json(recipe)
  }

  async update(req, res) {
    const schema = yup.object().shape({
      recipe_name: yup.string().required(),
      ingredients: yup.string().required(),
      preparation: yup.string().required(),
      preparation_time: yup.string().required(),
      income: yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação!' })
    }

    const recipe = await Recipe.findByPk(req.params.id)

    if (!recipe) {
      return res.status(400).json({ error: 'Receita não encontrada!' })
    }

    const recipeUpdated = await recipe.update(req.body)

    return res.json(recipeUpdated)
  }

  async delete(req, res) {
    const recipe = await Recipe.findByPk(req.params.id)

    if (!recipe) {
      return res.status(400).json({ error: 'Receita não encontrada !' })
    }

    await recipe.destroy()

    return res.json({ message: 'Recipe deleted !' })
  }
}

module.exports = new RecipeController()
