export const token = localStorage.getItem("token");
const logOutButton = document.querySelector("#login-btn");


/**  check if user is logged in

* @returns {boolean} - true if user is logged in, false otherwise
*/
export const isLoggedIn = () => {
    if (token != null) {
        return true;
    }
    return false;
}

// change login button to logout button
export function logout() {
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