const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filters = query ? { $or: [{ category: query }, { status: query }] } : {};

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {},
    };

    const products = await Product.paginate(filters, options);
    res.json({
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.hasPrevPage ? page - 1 : null,
      nextPage: products.hasNextPage ? page + 1 : null,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}` : null,
      nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}` : null,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});
