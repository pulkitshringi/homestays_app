// controllers/review.js
const Listing = require('../models/listings')
const Review = require('../models/review');

module.exports.createReview = async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    let review = new Review(req.body.review);
    review.author = req.user._id;
    listing.reviews.push(review);
    console.log(review);
    await review.save();
    await listing.save();
    req.flash('success','Successfully created new review');
    res.redirect(`/listings/${id}`);
}
module.exports.deleteReview = async(req,res)=>{
    const {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}); // remove review from listing
    await Review.findByIdAndDelete(reviewId); // delete review
    req.flash('success','Successfully deleted review');
    res.redirect(`/listings/${id}`);
}