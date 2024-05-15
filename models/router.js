const express = require('express');
const router = express.Router();
const Product = require('./product.model');

// Маршрут для получения продуктов по категории
router.get('/products/:category', (req, res) => {
   const category = req.params.category;
   Product.find({ category: category })
      .then(products => res.json(products))
      .catch(err => res.status(400).send(err));
});

module.exports = router;
