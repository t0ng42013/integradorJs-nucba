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
const cardNotification = document.getElementById("cardNotification");
const btnCloseNofification = document.getElementById("btnCloseNofification");
const logeo = document.getElementById("logeo");
const account = document.getElementById("account");
const lbSearch = document.getElementById("lbSearch");
const search = document.getElementById("search");
const closeSearch = document.getElementById("closeSearch");
const ACsearch = document.getElementById("ACsearch");
const searchContainer = document.getElementById("searchContainer");
const titleSearch = document.getElementById("titleSearch");
const menuFoot = document.getElementById("menuFoot");
const arrowUp = document.getElementById("arrowUp");
const formSearch = document.getElementById("formSearch");



//funcion para navegacion de nav
const toggleElement = (element1, element2, element3, element4) => {
  element1.classList.toggle("hidden");
  element3.classList.add("hidden");
  element4.classList.add("hidden");

  element1.classList.contains("hidden")
    ? element2.classList.add("hidden")
    : element2.classList.remove("hidden");

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
/*************************CARD NOTIFICATION****************/
//HTML NOTIFICATION
const templateResumeCard = async (producto) => {
  return (cardNotification.innerHTML = `
<div class=" bg-[#1a1a1a] w-11/12 flex flex-col justify-center items-center mx-auto ">
    <div class="flex m-4 justify-between">
        <img class="border" src=${producto.image} alt="${producto.name
    }" width="70" height="70" loading="lazy">

         <div class=" w-3/4 pl-8">
        <h3 class="cart-notification-product__name h4 font-semibold">${producto.name
    }</h3></div>

        <div class=" px-4">
            <button><i id="btnCloseNofification" class="fa-solid fa-xmark text-2xl"></i></button>
        </div>
    </div>
    <div class="flex">
        <button id="btnViewCart" class="px-16 py-2 bg-gray-500 m-4 hover:bg-blue-500"> View my cart  <span>(${await cantidadCompras()})  </span></button>
    </div>
    <button id="btnContinue" class="py-4 mx-auto underline hover:no-underline" >Continue shopping</button>
</div>
`);
};

//funcion para mostrar notificacion
const mostrarNotificacion = () => {
  cardNotification.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  alturaVentana = window.screenY;
  overlay.style.top = `${alturaVentana}px`;
};

cardNotification.addEventListener('click', (e) => {
  if (e.target.id === "btnCloseNofification" || e.target.id === "btnContinue") {
    cardNotification.classList.add("hidden");
    overlay.classList.add("hidden");
    document.body.style.overflow = "visible";
    alturaVentana = window.screenY;
    overlay.style.top = `${alturaVentana}px`;
  }

  if (e.target.id === "btnViewCart") {
    cardNotification.classList.add("hidden");
    overlay.classList.add("hidden");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      menuShop.classList.remove("hidden");
      overlay.classList.remove("hidden");
      overlay.style.top = '80px';
    }, 1000);

  }


});

//*********** cart ******************************** */
const cantidadCompras = async () => {
  let compras = await traerProductos();
  cantidadShop.textContent = `(${compras.length})`;
  return compras.length;
};

//template HTML
const templateProductCart = (product) => {
  const { id, image, name, price, cantidad } = product;
  templateResumeCard(product);
  return `
     <li class="py-4 hover:bg-gray-800">
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
//funcion para menajar los precios para mas de mil
const conversor = (price) => {
  partes = price.toString().split(".");
  if (partes[1].length !== 3) {
    return (price = parseFloat(partes[0]));
  }
  price = parseFloat(price.toString().replace(".", ""));
  return price;
};

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
      return total + conversor(producto.price) * producto.cantidad;
    }, 0)
    .toFixed(2);
  btnBuyActive();
};

//****************************

//verifica que tenga compras
const btnBuyActive = async () => {
  let compras = await cantidadCompras()
  !compras ? btnBuy.style.cursor = 'not-allowed' : btnBuy.style.cursor = 'pointer';
  if (!compras) {
    btnBuy.setAttribute('disabled', 'disabled');

  } else {
    btnBuy.removeAttribute('disabled', '');

  }
};

//funcion para boton de compras comprueba la session storage
const BuyNow = () => {

  if (getActiveUser() === null) {
    window.location.href = "/assets/pages/login.html";
    return;
  }
  guardarProductos("");
  setTimeout(() => {
    window.location.href = "/index.html";
  }, 1000);
  alert('Gracias por su compra!');
};
//funcion para menejo de usuario y logeo
const UserActive = () => {
  if (getActiveUser() === null) {
    logeo.innerHTML = `Log In  <i class="fa-solid fa-right-to-bracket w-4 ml-4"></i>`;
    account.textContent = "Register";
  } else {
    logeo.innerHTML = `Log Out  <i class="fa-solid fa-right-from-bracket w-4 ml-4"></i>`;
    logeo.addEventListener('click', () => {
      sessionStorage.removeItem('activeUser')
      logeo.href = "";
      window.location.reload;
    });

    account.innerHTML = `Account  <i class="fa-solid fa-user-pen w-4 ml-4"></i>`;
    account.addEventListener('click', () => {
      account.href = "";
    })
  }
};


//template para search
const templateSearch = (prod) => {
  const { id, name, price, image } = prod
  return `
   <li class="my-2 w-full"> <a class="flex hover:bg-gray-500" href="/assets/pages/products.html?id=${id}&name=${name}">
                  <img class="h-10 m-2" src=${image} alt="name">
                  <div>
                    <h3>${name}name</h3>
                    <span>${price}price</span>
                  </div>
                </a>
              </li>
  `;
};

//toggle para navbar
btnShop.addEventListener("click", () => toggleElement(menuShop, overlay, menuUser, menuList));
btnMenu.addEventListener("click", () => toggleElement(menuList, overlay, menuUser, menuShop)
);
btnUser.addEventListener("click", () =>
  toggleElement(menuUser, overlay, menuList, menuShop)
);
closeMenu.addEventListener("click", () =>
  toggleElement(menuList, overlay, menuUser, menuShop)
);
//boton de compras de carrito
btnBuy.addEventListener("click", () => BuyNow());
//menu de informacion al pie de la pagina
menuFoot.addEventListener('click', () => {
  overlay.classList.add('hidden')
  menuList.classList.add('hidden')
  document.body.style.overflow = 'visible';
  window.scrollTo({
    top: document.body.scrollHeight, // Desplazarse hasta el final de la página
    left: 0,
    behavior: "smooth"
  });
});
//icono de la lupa o search
ACsearch.addEventListener('click', () => {
  menuList.classList.add('hidden');
  menuShop.classList.add('hidden');
  menuUser.classList.add('hidden');
  document.body.style.overflow = 'visible';
});

//funcion de filtro de lupa
search.addEventListener('input', async () => {

  let valor = search.value.toLowerCase();
  let products = await requestProd();
console.log(valor)
  resul = products.filter(product =>
    product.name.toLowerCase().includes(valor)
  )
  console.log(resul)
  titleSearch.classList.remove("hidden");
  searchContainer.innerHTML = resul.map(product => templateSearch(product)).join('');
});

//cerrar details de lupa o search
closeSearch.addEventListener("click", () => {
  ACsearch.removeAttribute('open')
  search.value = '';
  searchContainer.innerHTML = '';
  titleSearch.classList.add("hidden");
  overlay.classList.add("hidden");
});
//cuando abro la lupa resetea los valores de busqueda
ACsearch.addEventListener('click', () => {
  search.value = '';
  searchContainer.innerHTML = '';

});

const formSearchProduct = (e) => {
  e.preventDefault();
};


window.addEventListener("DOMContentLoaded", renderMiniCard);
window.addEventListener("DOMContentLoaded", UserActive);
formSearch.addEventListener("submit", formSearchProduct);

window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    arrowUp.style.display = "none";
    if (document.documentElement.scrollTop > 400) {
      // Muestra el botón cuando se hace suficiente scroll 
      arrowUp.style.display = "block";
      arrowUp.style.position = "fixed";
      arrowUp.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        })
        ;
      })

    } else {
      // Oculta el botón si no se ha hecho suficiente scroll
      arrowUp.style.display = "none";
    }
  });

});
