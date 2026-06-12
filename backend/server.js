const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();


/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));


/* FRONTEND STATIC FILES */

app.use(
express.static(
path.join(__dirname,"public")
)
);


/* ROUTES */

const paymentRoutes =
require("./routes/paymentRoutes");

const attendanceRoutes =
require("./routes/attendanceRoutes");


app.use(
"/api/payment",
paymentRoutes
);

app.use(
"/api/attendance",
attendanceRoutes
);


/* FRONTEND ROUTES */

app.get("*",(req,res)=>{

res.sendFile(
path.join(
__dirname,
"public",
"index.html"
)
);

});


/* DATABASE */

mongoose.connect(
process.env.MONGO_URI
)
.then(()=>{

console.log(
"MongoDB Connected Successfully"
);

})
.catch((error)=>{

console.log(error);

});


/* SERVER */

const PORT =
process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log(
`💪 SERVER RUNNING ON PORT ${PORT}`
);

});