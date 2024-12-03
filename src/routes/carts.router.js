const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');

// DELETE api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    cart.products = cart.products.filter((item) => item.product.toString() !== pid);
    await cart.save();
    res.json({ message: 'Producto eliminado del carrito', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
