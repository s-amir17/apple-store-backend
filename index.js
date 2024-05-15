// WGlZimRorlz1boyQ
// https://cloud.mongodb.com/v2/662915fd5392e236c4225003#/metrics/replicaSet/662916c9e8c3b9373c45e2c4/explorer/test/products/find

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Categorie = require('./models/categorie.model');
const Product = require('./models/product.model');
const Cart = require('./models/cart.model');
const productRoutes = require('./models/router.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors()).use(express.json()).use('/store/', productRoutes).use(express.static('images')).use(bodyParser.json());

//* START //

app.listen(PORT, () => {
   console.log('Bismillah');
});
app.get('/', function (req, res) {
   res.send('Hello World ');
});

//? PRODUCTS

//* GET //

app.get('/store/products', async (req, res) => {
   try {
      const products = await Product.find({});
      res.status(200).json(products);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

app.get('/store/product/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

//* UPDATE //

app.put('/store/product/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
      if (!product) {
         return res.status(404).json({ message: 'Product not found' });
      }

      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

//* DELETE //

app.delete('/store/product/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
         return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'deleted successfully lol' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

//* POST //

app.post('/store/products', async (req, res) => {
   try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

//! CATEGORIES

//* GET //

app.get('/store/categories', async (req, res) => {
   try {
      const categorie = await Categorie.find({});
      res.status(200).json(categorie);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

app.get('/store/products/:category', async (req, res) => {
   try {
      const category = req.params.category;
      const categorie = await Categorie.find({ category: category });
      res.status(200).json(categorie);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

//* POST //

app.post('/store/categories', async (req, res) => {
   try {
      const categorie = await Categorie.create(req.body);
      res.status(200).json(categorie);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

//! CART

//* GET //

app.get('/cart', async (req, res) => {
   try {
      const cart = await Cart.find({});
      res.status(200).json(cart);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

//* POST //

app.post('/cart', async (req, res) => {
   try {
      const cart = await Cart.create(req.body);
      res.status(200).json(cart);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

//* DELETE //

app.delete('/cart/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const cart = await Cart.findByIdAndDelete(id);
      if (!cart) {
         return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'deleted successfully lol' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

app.delete('/cart', (req, res) => {
   Cart.deleteMany({})
      .then(() => {
         res.send('All products deleted successfully');
      })
      .catch(err => {
         res.status(400).send('Error deleting products');
      });
});

//* UPDATE //

// app.put('/cart/:id', async (req, res) => {
//    try {
//       const { id } = req.params;
//       const cart = await Cart.findByIdAndUpdate(id, req.body);
//       if (!cart) {
//          return res.status(404).json({ message: 'Product not found' });
//       }

//       const updatedProduct = await Cart.findById(id);
//       res.status(200).json(updatedProduct);
//    } catch (error) {
//       res.status(500).json({ message: error.message });
//    }
// });

//? MONGOOSE CONNECTION

mongoose
   .connect('mongodb+srv://lolzadr:WGlZimRorlz1boyQ@node-api.jrvfgf8.mongodb.net/?retryWrites=true&w=majority&appName=Node-API')
   .then(() => console.log('Connected! LOL'))
   .catch(error => console.log(error));
