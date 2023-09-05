// https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7
// const clave = '252b9f6f3bf54643bbf6908899982298';

const container = document.getElementById('prod-container');
const btnProd = document.getElementById('v');
const containerOfer = document.getElementById("container-offer");
const btnFeatured = document.getElementById("Featured");
const btnBestseller = document.getElementById("Bestseller");
const btnSpecial = document.getElementById("Special");
const btnShop = document.getElementById("shop");
const menuShop = document.getElementById("menuShop");
const overlay = document.getElementById("overlay");
console.log(overlay)

// Declara estado como una variable global
let estado;


const createProdTemplate = (productos) => {
    const{name, price, image, category} = productos;
 
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

const renderProd = (productosData) => {
    container.innerHTML += productosData.map(createProdTemplate).join('');
    
};

const renderOffer = productosData => {
    let offe= productosData.filter(producto => producto.price > 99)   
    containerOfer.innerHTML += offe.map(createProdTemplate).join('');
};

const mostrarMas = () => {
  estado.currentProd += 1;
  let { product, currentProd } = estado;
  renderProd(product[currentProd]);
  // Verifica si se alcanzó el límite de productos disponibles
  if (currentProd >= estado.prodLimit) {    ;
    btnProd.classList = "hidden"; // Oculta el botón si se alcanzó el límite
  }
};

const renderByFilter = (productosData, filterFunction) => {
  container.innerHTML = '';
  btnProd.classList.add('hidden');
  const filteredData = productosData.filter(filterFunction);
  renderProd(filteredData);
};

const priceRangeFilter = (minPrice, maxPrice) => {
  return (producto) => producto.price > minPrice && producto.price < maxPrice;
};

const ShowCart = () => {
  
  menuShop.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
  
};
const init = async () => {
  const productosData = await requestProd();
  
  const divideProduct = (size) => {
    let productsList = [];
    for (let i = 0; i < productosData.length; i += size) {
      productsList.push(productosData.slice(i, i + size));
    }
    return productsList;
  };

  estado = {
    product: divideProduct(4),
    currentProd: 0,
    prodLimit: divideProduct(6).length,
    active: null,
  };
  renderProd(estado.product[0]);
  renderOffer(productosData);
  btnProd.addEventListener("click", mostrarMas);
  btnFeatured.addEventListener("click", () => renderByFilter(productosData, priceRangeFilter(150, 350))
  );
  btnBestseller.addEventListener("click", () => renderByFilter(productosData,priceRangeFilter(1,10)));
  btnSpecial.addEventListener("click", () => renderByFilter(productosData,priceRangeFilter(2,3)));

  btnShop.addEventListener("click", () => ShowCart());  
};

init();

