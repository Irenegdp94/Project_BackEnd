let form = document.getElementById("form");
let login_button = document.getElementById("loginButton");
let p = document.getElementById("paragraph");

async function get_info_user() {
  let user_name = document.getElementById("user_name").value;
  let user_password = document.getElementById("user_password").value;
  let url = "http://localhost:5000/login";
  //let urlCORS = "https://cors-anywhere.herokuapp.com/";

  let require_data = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ //lo que yo le paso yo
      nom: user_name,
      pass: user_password,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });

  return require_data;
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  let data = await get_info_user();
  
  if (data.auth == true) {
    window.localStorage.userName = data.userName;
    window.localStorage.userID = data.userID;
    window.location.href = "http://127.0.0.1:5000/pajaro.html";
  } else {
    p.innerHTML = data.message;
    

  }
});
