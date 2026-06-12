/* USER */

const user =
JSON.parse(
localStorage.getItem("user")
);

if(!user){

window.location.href =
"login.html";

}

/* USER NAME */

const username =
document.getElementById("username");

if(username){

username.innerText =
user.name || "Member";

}

/* MEMBERSHIP */

const plan =
localStorage.getItem(
"membershipPlan"
);

const planElement =
document.getElementById("plan");

if(planElement){

planElement.innerText =
plan || "No Active Plan";

}

/* DIET */

const diet =
localStorage.getItem(
"dietPlan"
);

const dietElement =
document.getElementById("diet");

if(dietElement){

dietElement.innerText =
diet || "No Diet Selected";

}

/* TRAINER */

const trainer =
localStorage.getItem(
"trainer"
);

const trainerElement =
document.getElementById("trainer");

if(trainerElement){

trainerElement.innerText =
trainer || "No Trainer Booked";

}

/* LOGOUT */

function logout(){

localStorage.removeItem(
"user"
);

alert(
"Logged Out Successfully"
);

window.location.href =
"login.html";

}