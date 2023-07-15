require('dotenv').config()

module.exports = {
  dialect: 'postgres',
  host: "164.152.48.202",
  username: "postgres",
  password: "Julia2912",
  database: "recipes",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
