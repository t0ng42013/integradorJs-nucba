const nameProducts = document.getElementById("nameProduct");
const titleProduct = document.getElementById("titleProduct");
const priceProduct = document.getElementById("priceProduct");
const descriProduct = document.getElementById("descriProduct");
const imgProduct = document.getElementById("imgProduct");
const stockProduct = document.getElementById("stockProduct");
const btnMenos = document.getElementById("btnMenos");
const iptNumber = document.getElementById("iptNumber");
const btnMas = document.getElementById("btnMas");
const btnCart = document.getElementById("btnCart");
const cantidadShop = document.getElementById("cantidadShop");

const PRODUCT_ID_PARAM = "id";

// Función para guardar los productos en el local storage
function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para traer los productos del local storage
function traerProductos() {
  const productos = JSON.parse(localStorage.getItem("productos"));
  return productos || [];
}

const validarProductos =async (producto, productos) => {
  if (productos.some((prod) => prod.id === producto.id)) {
    let quantity = await handleQuantityChange();

    const productosActualizados = productos.map((produ) => {
      if (producto.id === produ.id) {
        // Actualiza la cantidad del producto deseado
        return { ...producto, cantidad: quantity };
      } else {
        return producto;
      }
    });
    guardarProductos(productosActualizados);
  
    return;
  }


  productos.push(producto);
   guardarProductos(productos);
 return;
};

const cantCart = async (cantidad)=>{ 
  const product = await getProduct();
console.log(typeof cantidad);
  return product.cantidad - cantidad;
};

// Función para agregar un producto al carrito
const agregarAlCarrito= async(producto)=> {
  const productos = await traerProductos();
  validarProductos(producto, productos);

renderMiniCard();
}

const getProduct = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get(PRODUCT_ID_PARAM);

  const data = await requestProd();

  const producto = data.find((producto) => producto.id === parseInt(id));
  return producto;
};

getProduct().then((producto) => {
  if (producto) {
    document.title = producto.name;
    nameProducts.innerHTML = producto.name;
    imgProduct.setAttribute("src", producto.image);
    titleProduct.innerHTML = producto.name;
    priceProduct.innerHTML = "$" + producto.price;
    descriProduct.innerHTML = producto.description;
    if (producto.cantidad > 10) {
      stockProduct.innerHTML = ": In Stock";
      stockProduct.style.color = "green";
    } else {
      stockProduct.innerHTML = ": Out of stock";
      stockProduct.style.color = "orange";
    }
  }
});

const handleQuantityChange = async (event) => {
  let quantity = await getProduct();
  let cantidad = parseInt(iptNumber.value);

  if (event && event.target) {
    // Verifica si event y event.target están definidos
    if (event.target.id === "btnMenos") {
      if (iptNumber.value === "1") {
        // Compara con cadena en lugar de número
        return;
      }
      cantidad--;     
    } else {
      if (iptNumber.value >= quantity.cantidad) {
        return;
      }
      cantidad++;      
    }
  }

  iptNumber.value = cantidad;
  return cantidad;
};

btnMenos.addEventListener("click", handleQuantityChange);
btnMas.addEventListener("click", handleQuantityChange);

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
  let cantidad = await handleQuantityChange(); 
  const listaHTML = productos.map((producto) => templateProductCart(producto))
  .join("");
  // Agrega la lista al contenedor menuShop
  menuShop.innerHTML = listaHTML;
  console.log(productos)
  cantidadCompras();
  let trash = document.querySelectorAll("#trash");
  trash = [...trash];
  trash.forEach((tras) => tras.addEventListener("click", (e) => deleteCard(e)));
};

renderMiniCard();

//agregar productos al carro
btnCart.addEventListener("click", async () => {
  const product = await getProduct();
  let cantidad = await handleQuantityChange();
  product.cantidad = cantidad;
  agregarAlCarrito(product);
  renderMiniCard();
});

const cantidadCompras = async () => {
  compras = await traerProductos();
  cantidadShop.textContent = `(${compras.length})`;
};
