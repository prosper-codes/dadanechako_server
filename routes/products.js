const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const reviewsController = require('../controllers/reviews');
const { ObjectId } = require('mongoose').Types;

// Middleware to validate if the id is a valid ObjectId
function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  next();
}

// Routes
router.get('/', productsController.getProducts);
router.get('/search', productsController.searchProducts);
router.get('/:id', validateObjectId, productsController.getProductById);
router.post('/:id/reviews', validateObjectId, reviewsController.leaveReview);
router.get('/:id/reviews', validateObjectId, reviewsController.getProductReviews);

module.exports = router;
