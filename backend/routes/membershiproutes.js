const express = require("express");

const router = express.Router();

const Membership =
require("../models/Membership");


// SAVE MEMBERSHIP
router.post("/save", async (req, res) => {

    try{

        const {
            userEmail,
            plan,
            price,
            paymentId
        } = req.body;

        const newMembership =
        new Membership({

            userEmail,

            plan,

            price,

            paymentId

        });

        await newMembership.save();

        res.status(201).json({

            msg:"Membership Saved"

        });

    }catch(error){

        console.log(error);

        res.status(500).json({

            msg:"Server Error"

        });

    }

});

module.exports = router;