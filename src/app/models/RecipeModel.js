const Sequelize = require('sequelize')
const { Model } = require('sequelize')

class Recipe extends Model {
  static init(sequelize) {
    super.init(
      {
        recipe_name: Sequelize.STRING,
        ingredients: Sequelize.STRING,
        preparation: Sequelize.STRING,
        preparation_time: Sequelize.STRING,
        income: Sequelize.STRING,
        image: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
  }
}

module.exports = Recipe
