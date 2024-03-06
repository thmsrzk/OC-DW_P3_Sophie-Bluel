const loginForm = document.querySelector("#login-form");
const loginApiUrl = "http://localhost:5678/api/users/login";

function login() {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const formLogs = new FormData(loginForm);
    const loginData = Object.fromEntries(formLogs);
    
    fetch(loginApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(loginData),
    })
    
    .then((response) => response.json())
    
    .then((data) => {
        if (data.token != null) {
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
        } else {
          const loginError = document.querySelector(".login-error");
          loginError.innerText = "Identifiants introuvables. Veuillez réessayer.";
        }
      })
    });
  }

  login();