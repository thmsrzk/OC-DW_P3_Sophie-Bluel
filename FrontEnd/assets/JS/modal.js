import { isLoggedIn } from "./logout.js"
import { sophiesWork } from "./gallery.js";
import { generateModalGallery } from "./gallery.js";



const modal = document.querySelector("#modal");
const stopPropagation = function (e) {
    e.stopPropagation();
}

const openModal = function (e) {
    e.preventDefault();
    modal.style.display = null;
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modale", 'true');
    modal.querySelector(".modal1-wrapper").addEventListener("click", stopPropagation);
    modal.querySelector(".modal2-wrapper").addEventListener("click", stopPropagation);
    modal.addEventListener("click", closeModal);
    document.querySelector("#add-picture").addEventListener("click", (event => {
        event.preventDefault();
        openUploadForm();
    }));
    modal.querySelectorAll(".close-modals").forEach((button) => {
        button.addEventListener("click", closeModal);
    });
}


export const closeModal = async function (e) { 
    e.preventDefault();
    modal.style.display = "none";
    uploadingForm.style.display = "none";
    modalContent.style.display = null;
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modale");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".modal1-wrapper").removeEventListener("click", stopPropagation);
    modal.querySelector(".modal2-wrapper").removeEventListener("click", stopPropagation);
    
}

const modalContent = document.querySelector(".modal1-wrapper");
const uploadingForm = document.querySelector(".modal2-wrapper");

// open (show) the work uploading form in the modal, and hide the original modal content
const openUploadForm = function () {
    uploadingForm.style.display = null;
    modalContent.style.display = "none";
    document.querySelector(".close-modal2").addEventListener("click", (event => {
        event.preventDefault();
        closeUploadForm();
    }));
}

// close (hide) the work uploading form in the modal and show again the original modal content
const closeUploadForm = function (e) {
    uploadingForm.style.display = "none";
    modalContent.style.display = null;
}

//delete everything related to the modal if the user is not logged in
export function removeModalRelatives() {
    if (!isLoggedIn()) {
        const elements = document.getElementsByClassName("modal-relative");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    } else {
        generateModalGallery(sophiesWork);
        document.querySelector(".open-modal").addEventListener("click", openModal);
    }
}