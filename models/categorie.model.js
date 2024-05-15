const mongoose = require('mongoose');

const CategorieSchema = mongoose.Schema(
   {
      category: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const Categorie = mongoose.model('Categorie', CategorieSchema);

module.exports = Categorie;
