const token = localStorage.getItem("token");

function logout() {

    if (token != null) {
        
        document.querySelector("#login-btn").innerHTML = 'logout';  
        document.querySelector("#login-btn").href = '';
        document.querySelector("#login-btn").style.color = "red";
        document.querySelector("#login-btn").addEventListener("click", () => {
            localStorage.removeItem("token");
            // window.location.href = "login.html";
        });
    }
}

logout();