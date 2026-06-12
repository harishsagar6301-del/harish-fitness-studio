async function startPayment(amount,plan){

  try{

    const response = await fetch(
      "http://localhost:5000/api/payment/create-order",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          amount:amount
        })
      }
    );

    const order = await response.json();

    const options = {

      key:"rzp_test_St7b5mIZTnpoC7",

      amount:order.amount,

      currency:"INR",

      name:"HARISH FITNESS STUDIO",

      description:plan,

      order_id:order.id,

      handler:function(response){

        alert("Payment Successful");

        localStorage.setItem(
          "membership",
          plan
        );

        window.location.href="success.html";

      }

    };

    const rzp = new Razorpay(options);

    rzp.open();

  }

  catch(error){

    console.log(error);

    alert("Payment Failed");

  }

}


/* BUTTONS */

document
.getElementById("basic-plan")
.addEventListener("click",()=>{

  startPayment(999,"BASIC");

});

document
.getElementById("pro-plan")
.addEventListener("click",()=>{

  startPayment(2499,"ELITE PRO");

});

document
.getElementById("ultimate-plan")
.addEventListener("click",()=>{

  startPayment(4999,"ULTIMATE");

});