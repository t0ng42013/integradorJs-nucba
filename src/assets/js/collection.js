const productAllContainers = document.getElementById("productContainer");
const navProducts = document.getElementById("navProducts");
const closeDetail = document.querySelectorAll('.closeDetail');
const btnApply = document.getElementById("btnApply");
const menuFilter = document.getElementById('menuFilter&sort');
const btnFilterSort = document.getElementById('btnFilterSort');
const ulConta=document.getElementById('ulConta');
const ulBrand = document.getElementById('ulBrand');



let estadoRadio;
let  data;
let nuevaData = [];

const obtenerCantProductos = async () => {
    const data = await productosData();
  navProducts.textContent = `${data.length} products`;
  return data;
};

// template del producto card
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

//renderiza el producto en productAllConteiner
const renderProd = (productos) => {
  productAllContainers.innerHTML += productos.map(createProdTemplate).join("");
};
//llamo a la bd por los productos
 const productosData = async () => {
    const data = await requestProd();    
    renderProd(data);
    return data;
 };

//funcion para cerrar el el menu de filtrado
 const closeDetailFunc = (e) => {    
    const detail = e.target.closest('details');    
    detail.hasAttribute('open')?detail.removeAttribute('open'): detail.setAtributes('open', 'true');
};
//funcion para ver cuanta disponibilidad hay de un producto
 const disponibilidad = async () => {
    const data = await requestProd(); 
    const stock = data.filter(prod => prod.cantidad >= 10);
    const outStock = data.filter(prod => prod.cantidad <10);
    return {stock, outStock};
 };
//renderiza los li html y mustra cantidades de stock
 const templateStock = async () => {
    a = await disponibilidad(); //mejorr nombre
    
    const{stock ,outStock}= a;
   const htmlLiStock = closeDetail[0].nextElementSibling.innerHTML = ` 
  <li class="relative flex items-center">
    <label for="Filter-Availability-mobile-1" class="p-4 w-full flex items-center">
      <input class="absolute appearance-none flex justify-around items-center peer" type="radio" name="availability" value="inStock" id="Filter-Availability-mobile-1">
      <span class="opacity-0"></span>
      <svg class="relative  mr-8" width="1.6rem" height="1.6rem" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <rect width="16" height="16" stroke="currentColor" fill="none" stroke-width="1"></rect>
      </svg>
      
      <svg class="absolute hidden peer-checked:block" width="1.1rem" height="0.7rem" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      In stock (${stock.length})
    </label>
  </li>

  <li class="relative flex items-center">
    <label for="Filter-Availability-mobile-2" class="p-4 w-full flex items-center">
      <input class="absolute appearance-none flex justify-around items-center peer" type="radio" name="availability" value="outStock" id="Filter-Availability-mobile-2">
      <span class="opacity-0"></span>
      <svg class="relative mr-8" width="relative" height="1.6rem" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <rect width="16" height="16" stroke="currentColor" fill="none" stroke-width="1"></rect>
      </svg>
      <svg  class="absolute hidden peer-checked:block" width="1.1rem" height="0.7rem" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      Out of stock (${outStock.length})
    </label>
  </li>
`;
    return htmlLiStock
 };


 const templateBrand = (brand) => {
  console.log(brand)
  const nombre = brand.map(a=>a.brand)
   return `      <li class="relative flex items-center">
                                <label for="${nombre[0]}" class="p-4 w-full flex items-center">
                                    <input class="absolute appearance-none flex justify-around items-center peer"
                                        type="radio" name="brand" value="nombre"
                                        id="${nombre[0]}">

                                    <span class="opacity-0"></span>

                                    <svg class="relative mr-8" width="1.6rem" height="1.6rem" viewBox="0 0 16 16"
                                        aria-hidden="true" focusable="false">
                                        <rect width="16" height="16" stroke="currentColor" fill="none" stroke-width="1">
                                        </rect>
                                    </svg>

                                    <svg class="absolute hidden peer-checked:block" width="1.1rem" height="0.7rem" viewBox="0 0 11 7" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1" stroke="currentColor"
                                            stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>

                                    ${nombre[0]} (${brand.length}) 
                                </label>
                            </li>`;
 };
 
 const renderBrand = async (nuevaData) =>{
   data = await productosData();
   brandList = [
     "Logitech",
     "Razer",
     "ASUS",
     "Corsair",
     "HyperX",
     "Acer",
     "LG",
     "Samsung",
     "Dell",
   ];

   for (let i = 0; i < brandList.length; i++) {
     nuevaData[i] = data.filter((prd) => prd.brand === brandList[i]);
   }
   console.log(nuevaData)
   ulBrand.innerHTML += await nuevaData.map(templateBrand).join("");
  
 };
renderBrand(nuevaData);



//funcion para ver opcion del input
const opcionInputRadio = async () => {
   const htmlLiStock = await templateStock(); 
   ulConta.innerHTML = htmlLiStock;
   const inStock = ulConta.querySelector("#Filter-Availability-mobile-1");
   const outStock = ulConta.querySelector("#Filter-Availability-mobile-2");
  
  inStock.addEventListener('change', () => estadoRadio = inStock );
  outStock.addEventListener('change', () =>estadoRadio = (outStock));

  return estadoRadio;
};

opcionInputRadio();


const btnApplya = async () => {
  const productos = await obtenerCantProductos();
  if (estadoRadio.checked && estadoRadio.value === 'inStock') {
    // Filtrar y renderizar productos "In stock"
    productAllContainers.innerHTML = '';
    const checked = productos.filter(producto => producto.cantidad >= 10);
    menuFilter.classList.add("hidden"); 
    
    btnFilterSort.innerHTML += ` <button class="px-10 py-1 border">
                               Clear</button>`;
    renderProd(checked);
  } else if (estadoRadio.checked && estadoRadio.value === "outStock") {
    // Filtrar y renderizar productos "Out of stock"
    productAllContainers.innerHTML = "";
    const outOfStockProducts = productos.filter((producto) => producto.cantidad < 10
    );
    menuFilter.classList.add("hidden");
    renderProd(outOfStockProducts);
    console.log('first')
  } else {
    // Ninguna opción está marcada, maneja esto según tu caso
    // Por ejemplo, puedes renderizar todos los productos nuevamente
    renderProd(productos);
    menuFilter.classList.add("hidden");
  }
};

const btnFilterSortFunc = () => {
  menuFilter.classList.toggle('hidden');
  // menuFilter.classList.contains('hidden')?overlay.classList.add('hidden'):overlay.classList.remove('hidden');
};





const load = () =>{
  document.addEventListener('DOMContentLoaded',obtenerCantProductos);
  closeDetail.forEach(btn => btn.addEventListener('click', closeDetailFunc));
  btnApply.addEventListener('click',btnApplya);
  btnFilterSort.addEventListener('click',btnFilterSortFunc);
};
load();


