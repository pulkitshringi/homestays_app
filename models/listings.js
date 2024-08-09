// models/listings.js
const mongoose = require('mongoose');
const Review = require('./review');
const { listingSchema } = require('../schema');
const ListingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:{
        type:String,
        default:"https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(url)=>{return url===""?"https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":url},
        },
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
});

ListingSchema.post('findOneAndDelete',async function(listing){
    if(listing.reviews.length){
        const res = await Review.deleteMany({_id:{$in : listing.reviews}});
        console.log(res);
    }
});

const Listing = mongoose.model('Listing', ListingSchema);
module.exports = Listing;
