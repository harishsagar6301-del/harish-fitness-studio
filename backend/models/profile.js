const mongoose =
require("mongoose");

const profileSchema =
new mongoose.Schema({

    userEmail:{
        type:String,
        required:true
    },

    fullName:{
        type:String
    },

    age:{
        type:Number
    },

    height:{
        type:Number
    },

    weight:{
        type:Number
    },

    goal:{
        type:String
    },

    bmi:{
        type:Number
    }

},{
    timestamps:true
});

module.exports =
mongoose.model(
"Profile",
profileSchema
);