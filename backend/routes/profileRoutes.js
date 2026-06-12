const express =
require("express");

const router =
express.Router();

const Profile =
require("../models/Profile");


/* SAVE PROFILE */

router.post(
"/save-profile",
async(req,res)=>{

try{

const {

userEmail,
fullName,
age,
height,
weight,
goal,
bmi

} = req.body;


/* CHECK EXISTING */

let profile =
await Profile.findOne({

userEmail

});


if(profile){

/* UPDATE */

profile.fullName =
fullName;

profile.age =
age;

profile.height =
height;

profile.weight =
weight;

profile.goal =
goal;

profile.bmi =
bmi;

await profile.save();

return res.json({

msg:"Profile Updated"

});

}


/* CREATE NEW */

const newProfile =
new Profile({

userEmail,
fullName,
age,
height,
weight,
goal,
bmi

});

await newProfile.save();

res.status(201).json({

msg:"Profile Saved"

});

}catch(error){

console.log(error);

res.status(500).json({

msg:"Server Error"

});

}

});



/* GET PROFILE */

router.get(
"/:email",
async(req,res)=>{

try{

const profile =
await Profile.findOne({

userEmail:
req.params.email

});

res.json(profile);

}catch(error){

console.log(error);

res.status(500).json({

msg:"Server Error"

});

}

});


module.exports = router;