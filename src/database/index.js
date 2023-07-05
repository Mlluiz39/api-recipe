const Sequelize = require('sequelize')

const configDatabase = require('../config/database')
const User = require('../app/models/UserModel')
const Recipe = require('../app/models/RecipeModel')


const models = [User, Recipe] // não esquecer de importar cada model e incluir no array

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatabase)

    models.map((model) => model.init(this.connection))
  }
}

module.exports = new Database()
