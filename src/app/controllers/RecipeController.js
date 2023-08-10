const yup = require('yup')
const Recipe = require('../models/RecipeModel')
const cloudinary = require('../../config/cloudinaryConfig')

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
      image: yup.string(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação!' })
    }

    try {
      const {
        recipe_name,
        ingredients,
        preparation,
        preparation_time,
        income,
      } = req.body
      const image = req.file

      // Faça o upload da imagem para o Cloudinary
      let imageUrl = null
      if (image) {
        const result = await cloudinary.uploader.upload(image.path, {
          folder: 'recipe_images', // Especifique a pasta no Cloudinary para as imagens das receitas
        })
        imageUrl = result.secure_url
      }

      // Crie a receita com a URL da imagem no Cloudinary
      const recipe = await Recipe.create({
        recipe_name,
        image: imageUrl, // Salve a URL da imagem
        ingredients,
        preparation,
        preparation_time,
        income,
      })

      return res.json(recipe)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Erro ao criar a receita' })
    }
  }

  async update(req, res) {
    const schema = yup.object().shape({
      recipe_name: yup.string().required(),
      image: yup.string(),
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
