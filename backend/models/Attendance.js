const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

    userEmail:{
        type:String,
        required:true
    },

    checkInTime:{
        type:Date,
        default:Date.now
    },

    date:{
        type:String,
        required:true
    }

},{
    timestamps:true
});

module.exports = mongoose.model(
    "Attendance",
    attendanceSchema
);