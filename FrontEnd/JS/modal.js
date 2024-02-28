import isLoggedIn from "./logout.js"

function removeModalRelatives() {
    if (!isLoggedIn()) {
        const elements = document.getElementsByClassName("modal-relative");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}

removeModalRelatives();