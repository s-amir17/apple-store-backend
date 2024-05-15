const mongoose = require('mongoose');

const CartSchema = mongoose.Schema(
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
      qty: {
         type: Number,
         required: false,
         default: 0,
      },

      img: {
         type: String,
         required: false,
      },
   },
   { timestamps: true }
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
