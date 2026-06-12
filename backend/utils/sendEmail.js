const nodemailer =
require("nodemailer");

const sendEmail = async (

to,
subject,
text

) => {

try{

const transporter =
nodemailer.createTransport({

service:"gmail",

auth:{

user:"harishsagar6301@gmail.com",

pass:"H@risH124218"

}

});


await transporter.sendMail({

from:"HARISH FITNESS",

to:to,

subject:subject,

text:text

});


console.log(
"EMAIL SENT"
);

}catch(error){

console.log(error);

}

};

module.exports =
sendEmail;