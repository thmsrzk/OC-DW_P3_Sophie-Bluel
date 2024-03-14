import { deleteWork } from "./works/delete.js";

const worksApiUrl = "http://localhost:5678/api/works";
const gallery = document.querySelector(".gallery");


// fetch sophie's works
export let sophiesWork = await fetch(worksApiUrl).then(sophiesWork => sophiesWork.json());


// refresh json file containing sophie's works
async function sophiesWorkRefreshed() {
    sophiesWork = await fetch(worksApiUrl).then(response => response.json());
    return true;
}


// generate page gallery
export function generateGallery(sophiesWork) {
    for (let a = 0; a < sophiesWork.length; a++) {
        
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = sophiesWork[a].imageUrl;
        imageElement.alt = sophiesWork[a].title;

        const figcaptionElement = document.createElement("figcaption");
        const figcaptionContent = sophiesWork[a].title;

        gallery.appendChild(figureElement);
        figureElement.append(imageElement, figcaptionElement);
        figcaptionElement.append(figcaptionContent);
    }
}


// generate modal gallery
export function generateModalGallery(sophiesWork) {
    sophiesWork.forEach(work => {
        const galleryDiv = document.querySelector(".modal-gallery");

        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        
        const deleteButtonElement = document.createElement("button");
        deleteButtonElement.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        deleteButtonElement.id = work.id;
        deleteButtonElement.className = "modal-del-buttons"

        galleryDiv.appendChild(figureElement);
        figureElement.append(imageElement, deleteButtonElement);
    });
    deleteWork();
}


// refresh and re-generate both galleries
export async function refreshBothGalleries() {
    await sophiesWorkRefreshed();
    document.querySelector(".gallery").innerHTML = '';
    document.querySelector(".modal-gallery").innerHTML = '';
    generateGallery(sophiesWork);
    generateModalGallery(sophiesWork);
}

