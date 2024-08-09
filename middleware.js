// middleware.js
const Listing = require ('./models/listings');
const {listingSchema,reviewSchema} = require('./schema');
const ExpressError = require('./utils/expressError');
const Review = require('./models/review');

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        console.log(req.originalUrl);
        req.session.loginRedirect = req.originalUrl; 
        req.flash('error','You must be signed in');
        return res.redirect('/login');
    }
    next();
}
module.exports.loginRedirect = (req,res,next) =>{
    res.locals.redirect = req.session.loginRedirect;
    next();
}
module.exports.isOwner = async (req,res,next) =>{
    const {id} = req.params;
const listing = await Listing.findById(id);
if(!listing.owner._id.equals(req.user._id)){
    req.flash('error','You do not have permission to do that');
   return res.redirect(`/listings/${id}`);
}
next();
}
module.exports.validateListing = (req,res,next) => {
    let result = listingSchema.validate(req.body,{ abortEarly: false });
    if(result.error){
        throw new ExpressError(400,result.error.details.map(val=>val.message).join(','));
    }
    next();
}
module.exports.validateReview = (req,res,next) => {
    let result = reviewSchema.validate(req.body,{ abortEarly: false });
    if(result.error){
        throw new ExpressError(400,result.error.details.map(val=>val.message).join(','));
    }
    next();
}

module.exports.isAuthor = async (req,res,next) =>{
    const {id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error','You do not have permission to do that');
        return res.redirect(`/listings/${id}`);
    }
    next();
}