const token = localStorage.getItem("token");
const logOutButton = document.querySelector("#login-btn");

function logout() {

    if (token != null) {
        
        logOutButton.innerHTML = 'logout';  
        logOutButton.href = '';
        logOutButton.classList.add('logout-btn');
        logOutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            // window.location.href = "login.html";
        });
    }
}

logout();