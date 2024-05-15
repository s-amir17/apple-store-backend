const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
   {
      title: {
         type: String,
         required: [true, 'Enter product name'],
      },
      price: {
         type: Number,
         required: true,
         default: 0,
      },
      category: {
         type: String,
         required: true,
      },
      desc: {
         type: String,
         required: false,
      },
      img: {
         type: String,
         required: false,
      },
   },
   { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
