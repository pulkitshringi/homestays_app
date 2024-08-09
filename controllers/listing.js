// controllers/listing.js
const Listing = require ('../models/listings');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapBoxToken});

module.exports.index = async (req,res)=>{
    const listings = await Listing.find({});
    res.render("listings/index",{listings});
}
module.exports.newListing = (req,res)=>{
    res.render("listings/new");
};
module.exports.showListing = async (req,res)=>{
    try{
 const {id} = req.params;
    const listing = await Listing.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    })
    .populate('owner');
    if(!listing){
        req.flash('error','Listing does not exist');
        return res.redirect('/listings');
    }
    res.render("listings/show",{listing});
} catch(e){
    req.flash('error','Listing does not exist');
    return res.redirect('/listings');
}
}
module.exports.newListingPOST = async (req,res,next)=>{
    const {listing} = req.body;
    const listing1 = new Listing(listing);
  let response = await  geocodingClient.forwardGeocode({
        query: listing1.location,
        limit: 1
      })
        .send()
       listing1.geometry = response.body.features[0].geometry;
   
    listing1.owner = req.user._id; 
    if(req.file){ // if image was uploaded
    console.log(req.file);
    listing1.image.url = req.file.path;
    listing1.image.filename = req.file.filename;
    }
    await listing1.save();
    console.log(listing1);
    req.flash('success','Successfully created new listing');
    res.redirect('/listings'); 
    }
module.exports.editListing = async (req,res)=>{
    try{
    const {id} = req.params;``
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash('error','Listing does not exist');
        res.redirect('/listings');
    }
    let newUrl = listing.image.url;
    newUrl = newUrl.replace("/upload","/upload/e_blur:1000");
    res.render(`listings/edit`,{listing,newUrl});
} catch(e){
    req.flash('error','Listing does not exist');
    res.redirect('/listings');
}
}
module.exports.editListingPUT = async (req,res)=>{
    const { id } = req.params;  
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    const listing = await Listing.findById(id);
    if(req.file){ // if image was uploaded
        console.log(req.file);
        listing.image.url = req.file.path;
        listing.image.filename = req.file.filename;
        }
    await listing.save();
    req.flash('success','Successfully updated listing');
    res.redirect(`/listings/${id}`);
    }
module.exports.destroyListing = async (req,res)=>{
    
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success','Successfully deleted listing');
    res.redirect('/listings');
}