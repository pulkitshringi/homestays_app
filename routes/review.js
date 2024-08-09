// routes/review.js
const express = require('express');
const router = express.Router({mergeParams:true});
const Review = require('../models/review');
const Listing = require('../models/listings'); // required because we need to update the listing with the review
const {reviewSchema} = require('../schema');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressError');
const {isLoggedIn,validateReview,isAuthor} = require('../middleware');
const reviewController = require('../controllers/review');

// submit review route
router.post('/',isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
// delete review route 
router.delete('/:reviewId',isLoggedIn,isAuthor,wrapAsync(reviewController.deleteReview))
module.exports = router;