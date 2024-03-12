import { isLoggedIn , logout } from "./authentication/logout.js";
import { removeModalRelatives } from "./modal.js";
import { cancelImgUpload , addCategories , submitForm , changeSubmitColor , addImg } from "./works/add.js";
import { filtersClickEvent , allFilterClicked } from "./gallery.js";


import ("./gallery.js");
import ("./modal.js");

if (isLoggedIn() === true) {
    import ("./works/add.js");
    import ("./works/delete.js");
    import ("./authentication/logout.js");
    
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