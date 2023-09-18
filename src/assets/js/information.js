const refound = document.getElementById("Refund");
const terms = document.getElementById("Terms");
const buyers = document.getElementById("buyers");
const sellers = document.getElementById("sellers");
const cardContainer = document.getElementById("cardContainer");

const INFORMATION_NAME = "name";

const getNameUrl = () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const name = (urlParams.get(INFORMATION_NAME));    
    return name;
};

const renderPag = (name) =>{    
 const divToShow = document.getElementById(name.toLowerCase());
 if (divToShow) {
   divToShow.style.display = "block";
 }
};

window.addEventListener('DOMContentLoaded',renderPag(getNameUrl()))