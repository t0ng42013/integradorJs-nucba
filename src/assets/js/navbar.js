const btnShop = document.getElementById("shop");
const menuShop = document.getElementById("menuShop");
const menuShopUl = document.getElementById("menuShopUl");
const overlay = document.getElementById("overlay");
const btnUser = document.getElementById("user");
const menuUser = document.getElementById("userMenu");
const btnMenu = document.getElementById("menu");
const menuList = document.getElementById("menu-list");
const closeMenu = document.getElementById("closeMenu");
const cantidadShop = document.getElementById("cantidadShop");
const totalItem = document.getElementById("totalItem");
const subTotal = document.getElementById("subTotal");
const btnBuy = document.getElementById("btnBuy");



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

//********************User Active******************* */
const getActiveUser = () => {
  const activeUser = sessionStorage.getItem("activeUser");
  if (activeUser !== null) {
    return JSON.parse(activeUser);
  } else {
    return null;
  }
};
//***************Local Storage****************** */
// Función para guardar los productos en el local storage
function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para traer los productos del local storage
function traerProductos() {
  const productos = JSON.parse(localStorage.getItem("productos"));
  return productos || [];
}

//*********** cart ******************************** */
const cantidadCompras = async () => {
  let compras = await traerProductos();
  cantidadShop.textContent = `(${compras.length})`;
  return compras.length;
};

//template HTML
const templateProductCart = (product) => {
  const { id, image, name, price, cantidad } = product;
  return `
     <li class="py-4">
                    <div class="flex gap-4">
                        <img class="w-12 object-cover" src="${image}" alt="${name}">
                        <div class="flex flex-col text-sm">
                            <span class="pb-2 text-gray-500 ">${name}</span>
                            <span>${cantidad} x $${price}</span>
                        </div>
                        <i id="trash" data-id="${id}" class="fa-regular fa-trash-can hover:text-gray-500 cursor-pointer"></i>
                    </div>
                </li>
    `;
};

//borrar producto del carro (tachito)
function deleteCard({ target }) {
  let id = parseInt(target.getAttribute("data-id"));
  let products = traerProductos();
  let ListaNueva = products.filter((product) => product.id !== id);
  // Eliminar el producto del local storage
  guardarProductos(ListaNueva);
  renderMiniCard();
}

const renderMiniCard = async () => {
  const productos = await traerProductos();
  const listaHTML = productos
    .map((producto) => templateProductCart(producto))
    .join("");
  // Agrega la lista al contenedor menuShop
  menuShopUl.innerHTML = listaHTML;
  cantidadCompras();
  let trash = document.querySelectorAll("#trash");
  trash = [...trash];
  trash.forEach((tras) => tras.addEventListener("click", (e) => deleteCard(e)));
  totalItem.textContent = await cantidadCompras();
  subTotal.textContent = productos
    .reduce((total, producto) => {
      return total + producto.price * producto.cantidad;
    }, 0)
    .toFixed(2); 
    btnBuyActive();
};

//****************************

//verifica que tenga compras
const btnBuyActive = async () => {
 let compras =  await cantidadCompras()
 !compras?btnBuy.style.cursor ='not-allowed':btnBuy.style.cursor='pointer'; 
};


//funcion para boton de compras
const BuyNow = () => {
if(getActiveUser() === null){
  window.location.href = "/src/assets/pages/login.html";
}
alert('Gracias por su compra!');
};

btnShop.addEventListener("click", () => toggleElement(menuShop,overlay,menuUser,menuList));
btnMenu.addEventListener("click", () => toggleElement(menuList, overlay, menuUser, menuShop)
);
btnUser.addEventListener("click", () =>
  toggleElement(menuUser, overlay, menuList, menuShop)
);
closeMenu.addEventListener("click", () =>
  toggleElement(menuList, overlay, menuUser, menuShop)
);
btnBuy.addEventListener("click", () =>BuyNow());

window.addEventListener("DOMContentLoaded", renderMiniCard());