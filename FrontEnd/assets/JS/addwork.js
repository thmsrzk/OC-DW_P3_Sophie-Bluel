import { categories , refreshBothGalleries } from "./gallery.js";
import { token } from "./logout.js";
    
const uploadInput = document.querySelector('#image');
const uploadImage = document.querySelector('.image-upload img');
const uploadForm = document.querySelector('#new-work-form');
const cancelImgUploadBtn = document.querySelector('.cancel-img-upload');
const imageTitle = document.querySelector('#img-title');
const submitButton = document.querySelector('#add-validation');
const errorMessage = document.querySelector('.work-submit-error');


// Hide the uploading 'form' when image is uploaded
async function hideOthers() {
    document.querySelector("#img-up-label").style.display = 'none';
    document.querySelector(".fa-image").style.display = 'none';
    document.querySelector("#image").style.display = 'none';
    document.querySelector(".image-upload p").style.display = 'none';
};

// upload image
export function submitUploadImg() {
    uploadInput.addEventListener('change', () => {
        const file = uploadInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadImage.src = e.target.result;
                uploadImage.style.display = 'flex';
                cancelImgUploadBtn.style.display = null;
                hideOthers();
            }
            reader.readAsDataURL(file);
        }
    });
}
    
// reset the image upload 'form"
function resetImgUpload() {
    uploadInput.type = "text";
    uploadInput.type = "file";
    uploadImage.style.display = 'none';
    cancelImgUploadBtn.style.display = 'none';
    document.querySelector("#img-up-label").style.display = null;
    document.querySelector(".fa-image").style.display = null;
    document.querySelector("#image").style.display = null;
    document.querySelector(".image-upload p").style.display = null;
    submitButton.style.backgroundColor = '#B3B3B3';

}

// cancel image upload after clicking on the cancel button
export function cancelImgUpload() {
    cancelImgUploadBtn.addEventListener('click', () => {
        resetImgUpload();
    });
}


// add categories to category select element
export async function addCategories() {
    const selectElement = document.querySelector('#category');
    categories.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.value = category.id;
        optionElement.innerHTML = category.name;
        selectElement.appendChild(optionElement);
    });
}


// Submit form to API and reset it (form) after submit
export function submitForm() {
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
            refreshBothGalleries();
            resetForm();
            hideMessage();
            showSuccessMessage();
            setTimeout(hideMessage, 3000);
        } else {
            showErrorMessage();
            setTimeout(hideMessage, 3000);
            
        }
    });
}

function resetForm() {
    uploadForm.reset();
    resetImgUpload();
}


// change submit button color when all fields are filled
export function changeSubmitColor() {
    uploadForm.addEventListener("input", () => {
        if (imageTitle.value !== "" && uploadInput.value !== "") {
            submitButton.style.backgroundColor = '#1D6154';
            hideMessage();
        } else {
            submitButton.style.backgroundColor = '#B3B3B3';
        }
    });
}



// show an error or success message after submit
function showErrorMessage() {
    errorMessage.innerHTML = 'Veuillez remplir tous les champs du formulaire.';
    errorMessage.style.color = "red";
    errorMessage.style.fontWeight = "bold";
};

function showSuccessMessage() {
    errorMessage.innerHTML = 'Votre projet a bien été ajouté.';
    errorMessage.style.color = "green";
    errorMessage.style.fontWeight = "bold";
}

function hideMessage() {
    errorMessage.innerHTML = '#';
    errorMessage.style.color = "white";
};

