const express = require('express');
const authController = require('../controller/authController');
const reviewController = require('../controller/reviewController');
const userController = require('../controller/userController');

const router = express.Router();

router
  .route('/myReviewComplains')
  .get(authController.protect, reviewController.myReviewComplains);

router
  .route('/myReviewComplainsClosed')
  .get(authController.protect, reviewController.myReviewComplainsClosed);

router
  .route('/closeComplain/:id')
  .patch(authController.protect, reviewController.closeComplain);

router
  .route('/reviewerChange/:id')
  .patch(authController.protect, reviewController.reviewerChange);

module.exports = router;
