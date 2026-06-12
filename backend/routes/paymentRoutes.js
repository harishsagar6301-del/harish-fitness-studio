const express = require("express");

const Razorpay = require("razorpay");

const nodemailer = require("nodemailer");

const router = express.Router();

const Payment =
require("../models/payment");


// RAZORPAY INSTANCE
const razorpay = new Razorpay({

    key_id: "rzp_test_SxuhhrpBRiUznN",

    key_secret:
    "nh3BHfaLSq23R71acMne72KH"

});


/* EMAIL TRANSPORTER */

const transporter =
nodemailer.createTransport({

    service:"gmail",

    auth:{

        user:"harishsagar6301@gmail.com",

        pass:"H@risH124218"

    }

});


/* CREATE ORDER */

router.post(
"/create-order",
async (req, res) => {

try{

    const options = {

        amount:
        req.body.amount * 100,

        currency:"INR",

        receipt:
        "receipt_order"

    };

    const order =
    await razorpay.orders.create(
        options
    );

    res.json(order);

}catch(error){

    console.log(error);

    res.status(500).json({

        msg:"Payment Failed"

    });

}

});



/* SAVE PAYMENT */

router.post(
"/save-payment",
async (req, res) => {

try{

    const {

        userEmail,

        plan,

        amount,

        paymentId,

        orderId

    } = req.body;


    /* SAVE DATABASE */

    const newPayment =
    new Payment({

        userEmail,

        plan,

        amount,

        paymentId,

        orderId

    });

    await newPayment.save();


    /* SEND EMAIL */

    await transporter.sendMail({

        from:"HARISH FITNESS",

        to:userEmail,

        subject:
        "Membership Activated Successfully",

        text:
`Hello,

Your ${plan} membership has been activated successfully.

Amount Paid: ₹${amount}

Payment Status: Paid

Thank you for joining HARISH FITNESS STUDIO 💪`

    });


    res.status(201).json({

        msg:"Payment Saved & Email Sent"

    });

}catch(error){

    console.log(error);

    res.status(500).json({

        msg:"Server Error"

    });

}

});



/* GET ALL PAYMENTS */

router.get(
"/all-payments",
async (req, res) => {

try{

    const payments =
    await Payment.find()
    .sort({ paymentDate:-1 });

    res.json(payments);

}catch(error){

    console.log(error);

    res.status(500).json({

        msg:"Server Error"

    });

}

});


module.exports = router;