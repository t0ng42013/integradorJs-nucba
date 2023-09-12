const btnShop = document.getElementById("shop");
const menuShop = document.getElementById("menuShop");
const menuShopUl = document.getElementById("menuShopUl");
const overlay = document.getElementById("overlay");
const btnUser = document.getElementById("user");
const menuUser = document.getElementById("userMenu");
const btnMenu = document.getElementById("menu");
const menuList = document.getElementById("menu-list");
const closeMenu = document.getElementById("closeMenu");



//funcion para navegacion de nav
const toggleElement = (element1, element2, element3, element4) => {
    element1.classList.toggle("hidden");  
    element3.classList.add("hidden");
    element4.classList.add("hidden");
    element1.classList.contains("hidden")?element2.classList.add("hidden"):element2.classList.remove("hidden");

     element1.classList.contains("hidden")
     ? document.body.style.overflow = "visible"
     : document.body.style.overflow = "hidden"
    
}


btnShop.addEventListener("click", () => toggleElement(menuShop,overlay,menuUser,menuList));
btnMenu.addEventListener("click", () => toggleElement(menuList, overlay, menuUser, menuShop)
);
btnUser.addEventListener("click", () =>
  toggleElement(menuUser, overlay, menuList, menuShop)
);
closeMenu.addEventListener("click", () =>
  toggleElement(menuList, overlay, menuUser, menuShop)
);
