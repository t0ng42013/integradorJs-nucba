// https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7
// const clave = '252b9f6f3bf54643bbf6908899982298';

const container = document.getElementById('prod-container');
const containerOfer = document.getElementById("container-offer");
const btnFeatured = document.getElementById("Featured");
const btnBestseller = document.getElementById("Bestseller");
const btnSpecial = document.getElementById("Special");
const btnShop = document.getElementById("shop");
const menuShop = document.getElementById("menuShop");
const overlay = document.getElementById("overlay");
const btnUser = document.getElementById("user");
const menuUser = document.getElementById("userMenu");
const btnMenu = document.getElementById("menu");
const menuList = document.getElementById('menu-list');
const closeMenu = document.getElementById("closeMenu");
const btnMore = document.getElementById("btnMore");
const btnProductsAll = document.getElementById('btnView');


// Declara estado como una variable global
let estado;


const createProdTemplate = (productos) => {
  const { name, price, image, category } = productos;

  return `
        <div class="flex flex-col  w-32 my-4 ">
            <figure class="overflow-hidden">
                <img class="hover:scale-125 transition" src="${image}" alt="${category}">
            </figure>
            <!-- card-info -->
            <div class="flex flex-col justify-center items-center my-2 overflow-hidden">
                <span></span>
                <span class="text-white text-center">
                    <a href="http://" target="_blank" rel="noopener noreferrer">${name}</a>
                </span>
                <span class="text-gray-500 font-semibold">$${price}</span>
            </div>
        </div>
    `;
};

const renderProd = (productos) => {
  container.innerHTML += productos.map(createProdTemplate).join('');

};

const renderOffer = productosData => {
  let offe = productosData.filter(producto => producto.price > 99)
  containerOfer.innerHTML += offe.map(createProdTemplate).join('');
};

const mostrarMas = () => { 
  estado.currentProd += 1;
  let { product, currentProd } = estado;
  if (currentProd >= estado.prodLimit || estado.prodLimit === 1) {  
    btnMore.classList.add("text-[0px]"); // Oculta el botón si se alcanzó el límite  
  }
  renderProd(product[currentProd]);
  // Verifica si se alcanzó el límite de productos disponibles
};

const mostrarFiltro= ( filteredData) => { 
  const productosDivididos = divideProduct(2, filteredData);
  estado.product = productosDivididos;  
  estado.prodLimit = productosDivididos.length-1;
  renderProd(estado.product[estado.currentProd]);  
  estado.currentProd++;
  if (estado.currentProd >= estado.prodLimit  || estado.prodLimit === 1) {
    btnMore.classList.add("text-[0px]");
  } else {
    btnMore.classList.remove("text-[0px]");
    btnMore.classList.add("text-3xl");
  }
};

const renderByFilter = (productosData, filterFunction) => {
  container.innerHTML = '';
  const filteredData = productosData.filter(filterFunction);
  estado.currentProd = 0;  
  mostrarFiltro(filteredData);
};

const priceRangeFilter = (minPrice, maxPrice) => {
  return (producto) => producto.price > minPrice && producto.price < maxPrice;
};
// ! toggle navegacion
const toggleElement = (element1, element2, element3, element4) => {
  element1.classList.toggle("hidden");
  element3.classList.add("hidden");
  element4.classList.add("hidden");
  element1.classList.contains("hidden")
    ? element2.classList.add("hidden")
    : element2.classList.remove("hidden");
};

const divideProduct = (size, products) => {
  let productsList = [];

  for (let i = 0; i < products.length; i += size) {
    productsList.push(products.slice(i, i + size));
  }
  return productsList;
};

const productsAll = (productosData) => {
  window.location.href = ('/src/assets/pages/collection.html');
};


const init = async () => {
  const productosData = await requestProd();

  estado = {
    product: divideProduct(4, productosData),
    currentProd: 0,
    prodLimit: divideProduct(6, productosData).length,
    active: null,
  };

  renderProd(estado.product[0]);
  renderOffer(productosData);
  btnMore.addEventListener("click", mostrarMas);
  // btnMore.addEventListener('click', ()=> mostrartodo(productosData));
  btnFeatured.addEventListener("click", () => renderByFilter(productosData, priceRangeFilter(100, 350))
  );
  btnBestseller.addEventListener("click", () => renderByFilter(productosData, priceRangeFilter(1, 10)));
  btnSpecial.addEventListener("click", () => renderByFilter(productosData, priceRangeFilter(2, 3)));

  btnShop.addEventListener("click", () =>
    toggleElement(menuShop, overlay, menuUser, menuList)
  );
  btnMenu.addEventListener("click", () =>
    toggleElement(menuList, overlay, menuUser, menuShop)
  );
  btnUser.addEventListener("click", () =>
    toggleElement(menuUser, overlay, menuList, menuShop)
  );
  closeMenu.addEventListener("click", () =>
    toggleElement(menuList, overlay, menuUser, menuShop)
  );
  btnProductsAll.addEventListener('click', () =>productsAll(productosData));
};

init();

