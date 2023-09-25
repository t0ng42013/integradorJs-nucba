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
const btnBuyNow = document.getElementById("btnBuyNow");

const PRODUCT_ID_PARAM = "id";

//valida productos para poder ingresar al carrito
const validarProductos =async (producto, productos) => {
  if (productos.some((prod) => prod.id === producto.id)) {
    ListaNueva = productos.filter(prd => prd.id !== producto.id);
    ListaNueva.push(producto);
    guardarProductos(ListaNueva);
    renderMiniCard();
   return;   
  }
   productos.push(producto);
   guardarProductos(productos);
   renderMiniCard();
  return; 
};

// Función para agregar un producto al carrito
const agregarAlCarrito= async(producto)=> {
  const productos = await traerProductos();
  validarProductos(producto, productos);
  return ;
}
//obtengo info del producto pasada por la url
const getProduct = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get(PRODUCT_ID_PARAM);

  const data = await requestProd();

  const producto = data.find((producto) => producto.id === parseInt(id));
  return producto;
};
//con la info del producto actualizo titulo precio nombre y descripcion
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
      stockProduct.innerHTML = ": Low stock";
      stockProduct.style.color = "orange";
    }
  }
});
//cantidad del producto boton mas y menos y retorna cantidad
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

//btn Add to cart agregar productos al carro
btnCart.addEventListener("click", async () => {
  const product = await getProduct();
  let cantidad = await handleQuantityChange();
  mostrarNotificacion(product);
  product.cantidad = cantidad;
  agregarAlCarrito(product);
});

window.addEventListener('DOMContentLoaded',renderMiniCard());
btnBuyNow.addEventListener("click", () => BuyNow());


