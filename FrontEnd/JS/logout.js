const token = localStorage.getItem("token");
const logOutButton = document.querySelector("#login-btn");

const isLoggedIn = () => {
    if (token != null) {
        return true;
    }
    return false;
}

function logout() {
    if (isLoggedIn()) {
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

export default isLoggedIn;