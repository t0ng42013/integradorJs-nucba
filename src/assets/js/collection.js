const productAllContainers = document.getElementById("productContainer");




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
  productAllContainers.innerHTML += productos.map(createProdTemplate).join("");
};
 const productosData = async () => {
    const data = await requestProd();
    console.log(data)
    renderProd(data);
 };


document.addEventListener('DOMContentLoaded', () =>  productosData());