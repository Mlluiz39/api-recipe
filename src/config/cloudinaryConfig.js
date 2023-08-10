const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'drocbczra',
  api_key: '347398947579389',
  api_secret: '***************************',
  folder: 'recipe_images', // Especifique a pasta no Cloudinary para as imagens das receitas
})

module.exports = cloudinary
