import { deleteWork } from "./works/delete.js";

const worksApiUrl = "http://localhost:5678/api/works";
const categoriesApiUrl = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");

// fetch sophie's works and categories
export let sophiesWork = await fetch(worksApiUrl).then(sophiesWork => sophiesWork.json());
export const categories = await fetch(categoriesApiUrl).then(categories => categories.json());

// refresh json file containing sophie's works
async function sophiesWorkRefreshed() {
    sophiesWork = await fetch(worksApiUrl).then(response => response.json());
    return true;
}


//Erase html's .gallery content
document.querySelector(".gallery").innerHTML = '';

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


// Filter gallery by category
export function filtersClickEvent() {
    const filters = {
    "#all": null,
    "#objects": 1,
    "#apartments": 2,
    "#hotelsrestaurants": 3,
    };
    
    for (const [filterName, categoryId] of Object.entries(filters)) {
        const filter = document.querySelector(filterName);
        filter.addEventListener("click", function () {
            let workFiltered;
            if (categoryId === null) {
                workFiltered = sophiesWork;
            } else {
                workFiltered = sophiesWork.filter(function (work) {
                    return work.categoryId === categoryId;
                });
            }
            document.querySelector(".gallery").innerHTML = '';
            generateGallery(workFiltered);
        });
    }
}



// Change background and font color from selected filter-------------------------
const buttons = document.querySelectorAll('.filter');

buttons.forEach(button => {
  button.addEventListener('click', function () {
  buttons.forEach(filter => filter.classList.remove('selectedFilter'));
  this.classList.add('selectedFilter');
})
});


// Make "all" ("Tous") filter clicked by default ----------------------------------------
export function allFilterClicked () {
    document.getElementById('all').click();
}