import { isLoggedIn } from "./logout.js"
import { sophiesWork } from "./gallery.js";
import { generateModalGallery } from "./gallery.js";

//delete everything related to the modal if the user is not logged in


//open and close the modal
const modal = document.querySelector("#modal");
const stopPropagation = function (e) {
    e.stopPropagation();
}

const openFirstModal = function (e) {
    e.preventDefault();
    modal.style.display = null;
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modale", 'true');
    modal.querySelector(".modal1-wrapper").addEventListener("click", stopPropagation);
    modal.querySelector(".modal2-wrapper").addEventListener("click", stopPropagation);
    modal.addEventListener("click", closeModals);
    document.querySelector("#add-picture").addEventListener("click", (event => {
        event.preventDefault();
        openSecondModal();
    }));
    modal.querySelectorAll(".close-modals").forEach((button) => {
        button.addEventListener("click", closeModals);
    });
    
}


const closeModals = function (e) { 
    e.preventDefault();
    modal.style.display = "none";
    secondModal.style.display = "none";
    firstModal.style.display = null;
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modale");
    modal.removeEventListener("click", closeModals);
    modal.querySelector(".modal1-wrapper").removeEventListener("click", stopPropagation);
    modal.querySelector(".modal2-wrapper").removeEventListener("click", stopPropagation);
    
}

const firstModal = document.querySelector(".modal1-wrapper");
const secondModal = document.querySelector(".modal2-wrapper");

const openSecondModal = function () {
    secondModal.style.display = null;
    firstModal.style.display = "none";
    document.querySelector(".close-modal2").addEventListener("click", (event => {
        event.preventDefault();
        closeSecondModal();
    }));
}

const closeSecondModal = function (e) {
    secondModal.style.display = "none";
    firstModal.style.display = null;
}

function removeModalRelatives() {
    if (!isLoggedIn()) {
        const elements = document.getElementsByClassName("modal-relative");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    } else {
        generateModalGallery(sophiesWork);
        document.querySelector(".open-modal").addEventListener("click", openFirstModal);
    }
}

removeModalRelatives()




