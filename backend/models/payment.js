const mongoose = require("mongoose");


// PAYMENT SCHEMA
const paymentSchema =
new mongoose.Schema({

    userEmail:{
        type:String,
        required:true
    },

    plan:{
        type:String,
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    paymentId:{
        type:String,
        required:true
    },

    orderId:{
        type:String
    },

    status:{
        type:String,
        default:"Success"
    },

    paymentMethod:{
        type:String,
        default:"Razorpay"
    },

    paymentDate:{
        type:Date,
        default:Date.now
    }

});


// EXPORT MODEL
module.exports =
mongoose.model(
    "Payment",
    paymentSchema
);