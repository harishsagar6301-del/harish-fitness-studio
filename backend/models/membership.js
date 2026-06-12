const mongoose = require("mongoose");

const membershipSchema =
new mongoose.Schema({

    userEmail:{
        type:String,
        required:true
    },

    plan:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    paymentId:{
        type:String,
        required:true
    },

    status:{
        type:String,
        default:"Active"
    },

    purchaseDate:{
        type:Date,
        default:Date.now
    }

});

module.exports =
mongoose.model(
    "Membership",
    membershipSchema
);