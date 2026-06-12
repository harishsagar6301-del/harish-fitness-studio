const API_URL = "http://localhost:5000/api/auth";


/* =========================
   REGISTER
========================= */

async function register() {

  const name =
  document.getElementById("name").value.trim();

  const email =
  document.getElementById("email").value.trim();

  const password =
  document.getElementById("password").value.trim();


  if (!name || !email || !password) {

    alert("Please fill all fields");

    return;

  }

  try {

    const response = await fetch(

      `${API_URL}/register`,

      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          name,
          email,
          password

        })

      }

    );


    const data = await response.json();

    console.log(data);


    if (response.ok) {

      alert("Registration Successful");


      /* GO TO LOGIN PAGE */

      window.location.href = "login.html";

    }

    else {

      alert(data.msg || "Registration Failed");

    }

  }

  catch (error) {

    console.log(error);

    alert("Server Error");

  }

}



/* =========================
   LOGIN
========================= */

async function login() {

  const email =
  document.getElementById("email").value.trim();

  const password =
  document.getElementById("password").value.trim();


  if (!email || !password) {

    alert("Please fill all fields");

    return;

  }

  try {

    const response = await fetch(

      `${API_URL}/login`,

      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          email,
          password

        })

      }

    );


    const data = await response.json();

    console.log(data);


    if (response.ok) {

      /* SAVE USER TOKEN */

      localStorage.setItem(

        "token",

        data.token

      );


      /* SAVE USER DATA */

      localStorage.setItem(

        "user",

        JSON.stringify(data.user)

      );


      alert("Login Successful");


      /* GO TO DASHBOARD */

      window.location.href = "dashboard.html";

    }

    else {

      alert(data.msg || "Invalid Credentials");

    }

  }

  catch (error) {

    console.log(error);

    alert("Server Error");

  }

}



/* =========================
   LOGOUT
========================= */

function logout() {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  alert("Logged Out");

  window.location.href = "login.html";

}