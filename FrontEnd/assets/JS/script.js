import { isLoggedIn , logout } from "./logout.js";
import { removeModalRelatives } from "./modal.js";
import { cancelImgUpload , addCategories , submitForm , changeSubmitColor , addImg } from "./addwork.js";
import { filtersClickEvent , allFilterClicked } from "./gallery.js";


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
    addImg();


    // logout.js eventlistener and function calling
    logout();

}

// modal.js eventlistener and function calling
removeModalRelatives()

// gallery.js eventlistener and function calling
filtersClickEvent();
allFilterClicked();