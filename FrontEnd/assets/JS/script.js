import { isLoggedIn , logout } from "./authentication/logout.js";
import { removeModalRelatives } from "./modal.js";
import { cancelImgUpload , addCategories , submitForm , changeSubmitColor , addImg } from "./works/add.js";
import { filtersClickEvent , allFilterClicked } from "./filters.js";
import { generateFilter , categories , changeFilterColor } from "./filters.js";

import ("./gallery.js");
import ("./modal.js");
import ("./filters.js");

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

generateFilter(categories);
changeFilterColor();


// modal.js eventlistener and function calling
removeModalRelatives()

// gallery.js eventlistener and function calling
filtersClickEvent();
allFilterClicked();