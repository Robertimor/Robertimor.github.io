'use strict';

function hiddenByDisplay(el, visibled) {
    if (visibled == "hide") {
        el.classList.add("hide2")  
    } 
    else if (visibled == "show") {
        el.classList.remove("hide2")  
    }
    else if (visibled == "toggle") {
        el.classList.toggle("hide2")
    }
}



export {hiddenByDisplay}