import { categories , sophiesWork , sophiesWorkRefreshed, generateGallery , generateModalGallery } from "./gallery.js";
import { token } from "./logout.js";

const uploadInput = document.querySelector('#image');
const uploadImage = document.querySelector('.image-upload img');
const uploadForm = document.querySelector('#new-work-form');

// upload image and hide other elements
async function hideOthers() {
    document.querySelector("#img-up-label").style.display = 'none';
    document.querySelector(".fa-image").style.display = 'none';
    document.querySelector("#image").style.display = 'none';
    document.querySelector(".image-upload p").style.display = 'none';
  };

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadImage.src = e.target.result;
      uploadImage.style.display = 'flex';
      hideOthers();
    }
    reader.readAsDataURL(file);
  }
});


// add categories to category select element
async function addCategories() {
    const selectElement = document.querySelector('#category');
    categories.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.value = category.id;
        optionElement.innerHTML = category.name;
        selectElement.appendChild(optionElement);
    });
}
addCategories();


// Submit form to API

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData,
    })
    if (response.ok) {
        await sophiesWorkRefreshed();
        document.querySelector(".gallery").innerHTML = '';
        document.querySelector(".modal-gallery").innerHTML = '';
        generateModalGallery(sophiesWork);
        generateGallery(sophiesWork);
    }
});
