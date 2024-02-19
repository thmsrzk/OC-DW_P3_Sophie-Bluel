const apiUrl = "http://localhost:5678/api/works";
const sophiesWork = await fetch(apiUrl).then(sophiesWork => sophiesWork.json());




//Erase html's .gallery content
document.querySelector(".gallery").innerHTML = '';

// Add .gallery content from back-end
function generateGallery(sophiesWork) {
    for (let a = 0; a < sophiesWork.length; a++) {
        
        const galleryDiv = document.querySelector(".gallery");

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

generateGallery(sophiesWork);


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