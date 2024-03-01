const worksApiUrl = "http://localhost:5678/api/works";
const categoriesApiUrl = "http://localhost:5678/api/categories";
import { deleteWork } from "./deletework.js";
export const sophiesWork = await fetch(worksApiUrl).then(sophiesWork => sophiesWork.json());
export const categories = await fetch(categoriesApiUrl).then(categories => categories.json());
export async function sophiesWorkRefreshed() {
    sophiesWork = await fetch(worksApiUrl).then(response => response.json());
    return true;
}


//Erase html's .gallery content
document.querySelector(".gallery").innerHTML = '';

// generate page gallery
const gallery = document.querySelector(".gallery");

export function generateGallery(sophiesWork) {
    for (let a = 0; a < sophiesWork.length; a++) {
        
        const galleryDiv = gallery;

        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = sophiesWork[a].imageUrl;
        imageElement.alt = sophiesWork[a].title;

        const figcaptionElement = document.createElement("figcaption");
        const figcaptionContent = sophiesWork[a].title;

        galleryDiv.appendChild(figureElement);
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
        deleteButtonElement.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteButtonElement.id = work.id;
        deleteButtonElement.className = "modal-del-buttons"

        galleryDiv.appendChild(figureElement);
        figureElement.append(imageElement, deleteButtonElement);
    });
    deleteWork();
}



// ----------------------------------FILTERS------------------------------------
// "All" filter

const allFilter = document.querySelector("#all");

allFilter.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = '';
    generateGallery(sophiesWork);
});


// "Object" filter

const objectFilter = document.querySelector("#objects");

objectFilter.addEventListener("click", function () {
    const workFilteredByObject = sophiesWork.filter(function (work) {
        return work.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = '';
    generateGallery(workFilteredByObject);
});


// "Apartments" filter

const apartmentsFilter = document.querySelector("#apartments");

apartmentsFilter.addEventListener("click", function () {
    const workFilteredByApartment = sophiesWork.filter(function (work) {
        return work.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = '';
    generateGallery(workFilteredByApartment);
});


// "Hotels and Restaurants" filter

const hotelsrestaurantsFilter = document.querySelector("#hotelsrestaurants");

hotelsrestaurantsFilter.addEventListener("click", function () {
    const workFilteredByHandR = sophiesWork.filter(function (work) {
        return work.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = '';
    generateGallery(workFilteredByHandR);
});

// Change background and font color from selected filter-------------------------

const buttons = document.querySelectorAll('.filter');

buttons.forEach(button => {
  button.addEventListener('click', function () {
  buttons.forEach(filter => filter.classList.remove('selectedFilter'));
  this.classList.add('selectedFilter');
} /*, false*/ )
});


// Make "all" ("Tous") filter clicked by default ----------------------------------------
document.getElementById('all').click();