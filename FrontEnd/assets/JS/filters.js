import { generateGallery , sophiesWork } from "./gallery.js";

const categoriesApiUrl = "http://localhost:5678/api/categories";
export let categories = await fetch(categoriesApiUrl).then(categories => categories.json());

const regRemove = /[-\/\\^$*+&?. ()|[\]{}]/g;


//generate filters buttons
export function generateFilter(categories) {
    categories.forEach(category => {
        const filterBar = document.querySelector(".filterbar");

        const filter = document.createElement("button");
        filter.className = "filter";
        filter.id = category.name.toLowerCase().replace(regRemove, "");

        const filterText = document.createElement("span");
        filterText.className = "filtertext";
        filterText.innerHTML = category.name;

        filterBar.appendChild(filter);
        filter.append(filterText);
    });
    buttons = document.querySelectorAll('.filter');
}



// Filter gallery by category
export function filtersClickEvent() {
    categories['default'] = {id: null, name: "All"};
    for (const [_, obj] of Object.entries(categories)) {
        const filterHtmlID = `#${obj.name.toLowerCase().replace(regRemove, "")}`;
        const filter = document.querySelector(filterHtmlID);
        filter.addEventListener("click", function () {
            let workFiltered;
            if (obj.id === null) {
                workFiltered = sophiesWork;
            } else {
                workFiltered = sophiesWork.filter(function (work) {
                    return work.categoryId === obj.id;
                });
            }
            document.querySelector(".gallery").innerHTML = '';
            generateGallery(workFiltered);
        });
    }
}

// Change background and font color from selected filter-------------------------
let buttons = document.querySelectorAll('.filter');

export function changeFilterColor() {
    buttons.forEach(button => {
    button.addEventListener('click', function () {
    buttons.forEach(filter => filter.classList.remove('selectedFilter'));
    this.classList.add('selectedFilter');
    })
    });
}

// Make "all" ("Tous") filter clicked by default ----------------------------------------
export function allFilterClicked () {
    document.getElementById('all').click();
}