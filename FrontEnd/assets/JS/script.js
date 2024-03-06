import { isLoggedIn , logout } from "./logout.js";
import { removeModalRelatives } from "./modal.js";
import { cancelImgUpload , addCategories , submitForm , changeSubmitColor , submitUploadImg } from "./addwork.js";


import ("./gallery.js");
import ("./modal.js");

if (isLoggedIn() === true) {
    import ("./addwork.js");
    import ("./deletework.js");
    import ("./logout.js");

    // addwork.js eventlistener and function calling
    cancelImgUpload();
    addCategories();
    submitForm();
    changeSubmitColor();
    submitUploadImg();


    // logout.js eventlistener and function calling
    logout();

}

// modal.js eventlistener and function calling
removeModalRelatives()

