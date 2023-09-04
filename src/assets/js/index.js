// https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7
// const clave = '252b9f6f3bf54643bbf6908899982298';

const container = document.getElementById('prod-container');
const btnProd = document.getElementById('v');




const createProdTemplate = (productos) => {
    const{name, price, image, category} = productos;
 
  return `
        <div class="flex flex-col justify-center p-2 w-32 my-4 border">
            <figure>
                <img src="${image}" alt="${category}">
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



const init = async () => {
  const productosData = await requestProd(); // Debes obtener los datos reales de los productos aquí

    const divideProduct = (size) => {
      let productsList = [];
      for (let i = 0; i < productosData.length; i += size) {
        productsList.push(productosData.slice(i, i + size));        
    }
    return productsList;
    };

    const estado = {
      product: divideProduct(4),
      currentProd: 0,
      prodLimit: divideProduct(6).length,
      active: null,
    };
    renderProd(estado.product[0]); 
 
    const mostrarMas = () => {
      console.log("jaskhd");

      estado.currentProd += 1;
      let { product, currentProd } = estado;
      renderProd(product[currentProd]);
    };
    btnProd.addEventListener("click", mostrarMas);
};


init();