// init/index.js
const mongoose = require('mongoose');
let data = require('./data');
const Listing = require('../models/listings');
const URL = 'mongodb://127.0.0.1:27017/wanderlust';
async function main(){
    await mongoose.connect(URL);
}
main().then(()=>{console.log("Connected to MongoDB")}).catch((err)=>{console.log("Error connecting to MongoDB")});
Listing.deleteMany({}).then(()=>{
    data = data.map(val => ({ ...val, owner: "66ab441508f1b20848a79faf" }));
   console.log(data);
    Listing.insertMany(data).then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    });
}).catch((err)=>{
    console.log(err);
});
