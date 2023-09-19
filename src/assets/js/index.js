const container = document.getElementById('prod-container');
const containerOfer = document.getElementById("containerOfer");
const btnFeatured = document.getElementById("Featured");
const btnBestseller = document.getElementById("Bestseller");
const btnSpecial = document.getElementById("Special");
const btnMore = document.getElementById("btnMore");
const btnProductsAll = document.getElementById('btnView');
const  btnBanner1 = document.getElementById('btnBanner1');
const  btnBanner2 = document.getElementById('btnBanner2');
const  banner1 = document.getElementById('banner1');
const  banner2 = document.getElementById('banner2');
const prevSpl = document.getElementById("prevSpl");
const nextSpl = document.getElementById("nextSpl");
const contentSpl = document.getElementById("contentSpl");
const containerOf = document.getElementById("containerOf");
const prevOf = document.getElementById("prevOf");
const nextOf = document.getElementById("nextOf");
const minutos = document.getElementById("min");
const sec = document.getElementById("sec");
const prevBlog = document.getElementById("prevBlog");
const nextBlog = document.getElementById("nextBlog");
const containerBlog = document.querySelector('.blog');

// Declara estado como una variable global
let estado;
let card = 1;

const createProdTemplate = (productos) => {
  const { id,name, price, image, category } = productos;

  return `
        <div class="flex flex-col  w-32 my-4 sm:w-44 sm:ml-4">
            <figure class="overflow-hidden">
                <img class="hover:scale-125 transition" src="${image}" alt="${category}">
            </figure>
            <!-- card-info -->
            <div class="flex flex-col justify-center items-center my-2 overflow-hidden">
                <span></span>
                <span class="text-white text-center cursor-pointer">
                     <a href="/src/assets/pages/products.html?id=${id}&name=${name}">${name}</a>
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
  containerOf.innerHTML += offe.map(createProdTemplate).join('');
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

 const bannerFun = () => {
   if (btnBanner1.classList.contains("active")) {
     banner2.style.transform = "translateX(-100%)";
     banner1.style.transform = "translateX(-100%)";
     btnBanner1.classList.remove("active");
     btnBanner2.classList.add("active");
     return;
   }
   if ((btnBanner2.contains = "active")) {
     banner2.style.transform = "translateX(0)";
     banner1.style.transform = "translateX(0)";
     btnBanner2.classList.remove("active");
     btnBanner1.classList.add("active");
     return;
   }
 };
//timer ofertas
const timerFun = () => {
  let seg = 59;
  let min = 59;
setInterval(() => {
 seg--;
 minutos.textContent = min; 
 if(seg === 0){
  min --;
  minutos.textContent = min;
 } 
  seg === 0 ? (seg = 60) : (sec.textContent = seg); 
 
}, 1000);

};

window.addEventListener('DOMContentLoaded', timerFun); 
/**************************************************** */

window.addEventListener("scroll", revealElements);

function revealElements() {
  const elements = document.querySelectorAll(".scroll-reveal");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight) {
      element.classList.add("reveal");
    }
  });
}

/**************************************************** */

const init = async () => {
  const productosData = await requestProd();
  estado = {
    product: divideProduct(4, productosData),
    currentProd: 0,
    prodLimit: divideProduct(6, productosData).length,
    active: null,
  };

 prevSpl.addEventListener('click', () => contentSpl.scrollLeft -= 80);
 nextSpl.addEventListener('click', () => contentSpl.scrollLeft += 80);
 nextOf.addEventListener('click', () =>  containerOfer.scrollLeft += 80);
 prevOf.addEventListener('click', () =>  containerOfer.scrollLeft -= 80);
 prevBlog.addEventListener('click', () =>  {
  if(card > 1 && card <= 5){
  containerBlog.style.transform += 'translateX(20%)';
  card--;
  }else{
    card = 1;
    containerBlog.style.transform = 'translateX(0)'
  }
 });
 nextBlog.addEventListener('click', () => {
   if (card >= 1 && card < 5) {   
    containerBlog.style.transform += "translateX(-20%)";  
    card++;
  } 
  
 });

  renderProd(estado.product[0]);
  renderOffer(productosData);
  btnMore.addEventListener("click", mostrarMas);
  // btnMore.addEventListener('click', ()=> mostrartodo(productosData));
  btnFeatured.addEventListener("click", () => renderByFilter(productosData, priceRangeFilter(100, 350))
  );
  btnBestseller.addEventListener("click", () => renderByFilter(productosData, priceRangeFilter(1, 10)));
  btnSpecial.addEventListener("click", () => renderByFilter(productosData, priceRangeFilter(2, 3)));
  btnProductsAll.addEventListener('click', () =>productsAll(productosData));
  btnBanner2.addEventListener('click',bannerFun)
  btnBanner1.addEventListener('click',bannerFun)

};

init();

