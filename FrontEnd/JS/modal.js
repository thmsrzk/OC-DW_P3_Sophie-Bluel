import isLoggedIn from "./logout.js"
import { sophiesWork } from "./script.js";
import { token } from "./logout.js";
import { generateGallery } from "./script.js";
import { sophiesWorkRefreshed } from "./script.js";

//delete everything related to the modal if the user is not logged in
function removeModalRelatives() {
    if (!isLoggedIn()) {
        const elements = document.getElementsByClassName("modal-relative");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    } else {
        generateModalGallery(sophiesWork);
    }
}

removeModalRelatives();

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
    modal.querySelectorAll(".close-modals").removeEventListener("click", closeModals);
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



document.querySelector(".open-modal").addEventListener("click", openFirstModal);


// generate modal gallery
function generateModalGallery(sophiesWork) {
    sophiesWork.forEach(work => {
        const galleryDiv = document.querySelector(".modal-gallery");

        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        
        const deleteButtonElement = document.createElement("button");
        deleteButtonElement.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteButtonElement.id = work.id;
        deleteButtonElement.className = "modal-del-buttons"

        galleryDiv.appendChild(figureElement);
        figureElement.append(imageElement, deleteButtonElement);
    });
    deleteWork();
}

// delete works from database
function deleteWork() {
    const buttons = document.querySelectorAll(".modal-del-buttons");
    buttons.forEach(button => {
        button.addEventListener("click", async () => {
            const id = button.id;
            const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (response.ok) {
                await sophiesWorkRefreshed();
                document.querySelector(".gallery").innerHTML = '';
                document.querySelector(".modal-gallery").innerHTML = '';
                generateModalGallery(sophiesWork);
                generateGallery(sophiesWork);
            }
        })
    })
}