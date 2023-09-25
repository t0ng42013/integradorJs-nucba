const productAllContainers = document.getElementById("productContainer");
const navProducts = document.getElementById("navProducts");
const closeDetail = document.querySelectorAll(".closeDetail");
const btnApply = document.getElementById("btnApply");
const menuFilter = document.getElementById("menuFilter&sort");
const btnFilterSort = document.getElementById("btnFilterSort");
const ulConta = document.getElementById("ulConta");
const ulBrand = document.getElementById("ulBrand");
const btnClearAvail = document.getElementById("btnClearAvail");
const btnClear = document.querySelectorAll(".btnClearAvail");
const hgtPrice = document.getElementById("hightPrice");
const iptPriceMin = document.getElementById("iptPriceMin");
const iptPriceMax = document.getElementById("iptPriceMax");
const aplyPrice = document.getElementById("aplyPrice");
const select = document.querySelector("#SortBy-mobile");
const btnBrand = document.getElementById("brandFil");
const aplyBrand = document.getElementById("btnBrandAppl");

let estadoRadio = false;
let data;
let nuevaData = [];
let maxPrice;

//obtiene cantidad de productos en stock y de poco stock y el producto de mayor precio
const obtenerCantProductos = async () => {
  const data = await productosData();
  navProducts.textContent = `${data.length} products`;

  let datan = data.map((dato) => {
    dato.price = precioMasAlto(dato.price);
    return dato;
  });
  maxPrice = datan.reduce((max, dat) => (dat.price > max ? dat.price : max), 0);
  hgtPrice.textContent = `The highest price is ${maxPrice}.`;

  return data;
};

// template del producto
const createProdTemplate = (productos) => {
  const {id, name, price, image, category } = productos;

  return `
        <div class="flex flex-col  w-32 my-4 ">
            <figure class="overflow-hidden">
                <img class="hover:scale-125 transition" src="${image}" alt="${category}">
            </figure>
            <!-- card-info -->
            <div class="flex flex-col justify-center items-center my-2 overflow-hidden">
                <span></span>
                <span class="text-white text-center">
                        <a href="/assets/pages/products.html?id=${id}&name=${name}" rel="noopener noreferrer">${name}</a>
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
  const detail = e.target.closest("details");
  detail.hasAttribute("open")
    ? detail.removeAttribute("open")
    : detail.setAtributes("open", "true");
};
//funcion para ver los productos en stock y de poco stock
const disponibilidad = async () => {
  const data = await requestProd();
  const stock = data.filter((prod) => prod.cantidad >= 10);
  const outStock = data.filter((prod) => prod.cantidad < 10);
  return { stock, outStock };
};
//renderizmenushopa los li html y mustra cantidades de stock
const templateStock = (stocks) => {
  const { stock, outStock } = stocks;
  return `
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
};

const templateBrand = (nuevaData) => {
  const nombre = nuevaData.map((arr) => arr.brand);
  const [brand] = nombre;
  return `      <li class="relative flex items-center">
                                <label for="${brand}" class="p-4 w-full flex items-center">
                                    <input class="absolute appearance-none flex justify-around items-center peer"
                                        type="radio" name="brand" value="nombre"
                                        id="${brand}">

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

                                    ${brand} (${brand.length}) 
                                </label>
                            </li>`;
};

const renderBrand = async (nuevaData) => {
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

  ulBrand.innerHTML += await nuevaData.map(templateBrand).join("");

  return nuevaData;
};
renderBrand(nuevaData);

const brandClick = ({ target }) => {
  const resulFilter = data.filter((nombre) => nombre.brand === target.id);
  productAllContainers.innerHTML = "";

  renderProd(resulFilter);
  aplyBrand.addEventListener("click", () => {
    menuFilter.classList.add("hidden");
  });
};

const filterBrand = () => {
  const iptNombre = document.querySelectorAll("#ulBrand li");
  let listBrand = [...iptNombre];
  listBrand.forEach((btn) => btn.addEventListener("click", brandClick));
};

//funcion para ver opcion del input
const opcionInputRadio = async () => {
  let stocks = await disponibilidad();
  
  ulConta.innerHTML = templateStock(stocks);
  const inStock = ulConta.querySelector("#Filter-Availability-mobile-1");
  const outStock = ulConta.querySelector("#Filter-Availability-mobile-2");

  inStock.addEventListener("change", () => (estadoRadio = inStock));
  outStock.addEventListener("change", () => (estadoRadio = outStock));

  return estadoRadio;
};

opcionInputRadio();

const btnApplya = async () => {
  const productos = await productosData();
  if (estadoRadio.checked && estadoRadio.value === "inStock") {
    // Filtrar y renderizar productos "In stock"
    productAllContainers.innerHTML = "";
    const checked = productos.filter((producto) => producto.cantidad >= 10);
    menuFilter.classList.add("hidden");
    renderProd(checked);
  } else if (estadoRadio.checked && estadoRadio.value === "outStock") {
    // Filtrar y renderizar productos "Out of stock"
    productAllContainers.innerHTML = "";
    const outOfStockProducts = productos.filter(
      (producto) => producto.cantidad < 10
    );
    menuFilter.classList.add("hidden");
    renderProd(outOfStockProducts);
  } else {
    // Ninguna opción está marcada, maneja esto según tu caso
    // Por ejemplo, puedes renderizar todos los productos nuevamente
    renderProd(productos);
    menuFilter.classList.add("hidden");
  }
};

const btnFilterSortFunc = () => {
  menuFilter.classList.toggle("hidden");
  // menuFilter.classList.contains('hidden')?overlay.classList.add('hidden'):overlay.classList.remove('hidden');
};
//fucion clear para sacar los filtros
const btncloseFilter = async () => {
  menuFilter.classList.add("hidden");
  let detail = document.querySelectorAll(".closeDetail");
  detail = [...detail]; //paso el nodeList a array
  detail.forEach((btn) => {
    if (btn.closest("details").hasAttribute("open")) {
      btn.closest("details").removeAttribute("open");
    }
  });
  estadoRadio.checked = false; //sacamos check del radio
  btnFilterSort.innerHTML =
    '<button class="px-8 py-2 text-white bg-blue-500 my-16 ml-8"> filter by</button>'; //eliminamos boton de filtro
  renderProd(await obtenerCantProductos());
};

const validarPrice = async () => {
  let valid = false;
  let max = iptPriceMax.value;
  let min = iptPriceMin.value;
  await maxPrice;
  maxPrice = parseFloat(maxPrice.toString().replace(".", ""));
  //validando que no este vacio y que solo ingrese numeros
  if (!min.length || isNaN(min)) {
    iptPriceMin.style.border = "1px solid red";
    valid = false;
    return;
  }
  if (!max.length || isNaN(max)) {
    iptPriceMax.style.border = "1px solid red";
    valid = false;
    return;
  }

  if (min < 0) {
    iptPriceMin.style.border = "1px solid red";
    valid = false;
    return;
  }

  if (max > maxPrice) {
    iptPriceMax.style.border = "1px solid red";
    valid = false;
    return;
  }
  if (min > max) {
    iptPriceMin.style.border = "1px solid red";
    iptPriceMax.style.border = "1px solid red";
    valid = false;
    return;
  }
  //si todo es correcto
  iptPriceMin.style.border = "1px solid green";
  iptPriceMax.style.border = "1px solid green";

  valid = true;
  return valid;
};


const precioModifi = (data) => {
  let nuevaData = data.map((producto) => {
    return {
      ...producto,
      price: conversor(producto.price),
    };
  });
  return nuevaData;
};

const filterPrice = async () => {
  if (await validarPrice()) {
    await data;
    productAllContainers.innerHTML = "";
    let precioConv = precioModifi(data);
    let filtrado = precioConv.filter(
      (producto) =>
        producto.price >= iptPriceMin.value &&
        producto.price <= iptPriceMax.value
    );
    renderProd(filtrado);
    console.log(data);
    menuFilter.classList.add("hidden");
    return;
  }
};

const precioMasAlto = (numero) => {
  const cadenaNumero = numero.toString(); // Convierte el número en una cadena
  const partes = cadenaNumero.split("."); // Divide la cadena en dos partes

  if (partes.length !== 2) {
    // Si no se divide en dos partes (parte entera y parte decimal), no tiene tres decimales
    return;
  }

  const parteDecimal = partes[1]; // Obtiene la parte decimal

  if (parteDecimal.length === 3) {
    // Si la longitud de la parte decimal es igual a 3, tiene tres decimales
    const numeroSinComa = parseFloat(cadenaNumero.replace(",", ""));
    return numeroSinComa;
  }
};

const filtradoSortBy = async (sortBy) => {
  await data;
  if (sortBy === "title-ascending") {
    let fil = data.sort((a, b) => a.name.localeCompare(b.name));
    productAllContainers.innerHTML = "";
    renderProd(fil);
    menuFilter.classList.add("hidden");
    return;
  } else if (sortBy === "title-descending") {
    menuFilter.classList.add("hidden");
    let fil = data.sort((a, b) => b.name.localeCompare(a.name));
    productAllContainers.innerHTML = "";
    renderProd(fil);
    menuFilter.classList.add("hidden");
    return;
  } else if (sortBy === "price-ascending") {
    let fil = precioModifi(data).sort((a, b) => a.price - b.price);
    productAllContainers.innerHTML = "";
    renderProd(fil);
    menuFilter.classList.add("hidden");
    return;
  } else if (sortBy === "price-descending") {
    let fil = precioModifi(data).sort((a, b) => b.price - a.price);
    productAllContainers.innerHTML = "";
    renderProd(fil);
    menuFilter.classList.add("hidden");
    return;
  }
};

//funcion sortBy:
select.addEventListener("change", ({ target }) => {
  const value = target.value;
  // Aquí se hace algo con el valor del select
  filtradoSortBy(value, (async) => {
    return;
  });
});


const load = () => {
  document.addEventListener("DOMContentLoaded", obtenerCantProductos);
  closeDetail.forEach((btn) => btn.addEventListener("click", closeDetailFunc));
  btnApply.addEventListener("click", btnApplya);
  btnFilterSort.addEventListener("click", btnFilterSortFunc);
  btnClearAvail.addEventListener("click", btncloseFilter);
  btnClear.forEach((btn) => btn.addEventListener("click", btncloseFilter));
  aplyPrice.addEventListener("click", filterPrice);
  btnBrand.addEventListener("click", filterBrand);
};
load();
