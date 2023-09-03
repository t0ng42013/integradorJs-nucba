//traer datos de LS
const subscribe = JSON.parse(localStorage.getItem('subscribe')) || [];
//guardar subscribe
const saveToLS = () => {
    localStorage.setItem('subscribe', JSON.stringify(subscribe));
};

 const background = "https://wallpaperset.com/w/full/a/a/1/5931.jpg";

const footNewsletter = document.getElementById("footerContainer");
const isEmailValid = (input) => {
  // Expresión regular para validar direcciones de correo electrónico
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Obtén el valor del input y elimina espacios en blanco al principio y al final
  const inputValue = input.value.trim();

  // Prueba si el valor coincide con la expresión regular
  return emailRegex.test(inputValue);
};

const createFooter = () => `
     <div class="px-4 bg-[url(${background})] ">
        <!-- contact us -->
        <div>
          <details>
            <summary class="flex justify-between items-center m-2 text-white font-semibold">
              <h2 class="hover:cursor-pointer">Contact Us</h2>
              <i class="fa-solid fa-chevron-down"></i>
            </summary>
            <ul class=" text-gray-500">
              <li>
                <span>Gamers - Game Store - Av. Colón 1234 <br>
                   Córdoba, Argentina
                </span>
              </li>
              <li><span class="my-4 block">(+54)012-345-6789</span></li>
              <li><a href="mailto:tonga88@live.com.ar">example@email.com</a></li>
            </ul>
          </details>
        </div>
        
        <div></div>

        <!-- information -->
        <div class="my-4">
          <details>
            <summary class="flex justify-between items-center m-2 text-white font-semibold">
             <h2 class="hover:cursor-pointer">Information</h2>
              <i class="fa-solid fa-chevron-down"></i>
            </summary>
            <ul class=" text-gray-500 [&_li]:my-2">
             <li><a href="">                           Shipping & Refund
                          </a></li>
             <li><a href="">
                            Terms and Conditions
                          </a></li>
             <li><a href="">
                            Sitemap
                          </a></li>
             <li><a href="">
                            Policy for Buyers
                          </a></li>
             <li><a href=""></a>
                            Policy for Sellers
                          </li>
            </ul>
          </details>

        </div>

        <!--Newsletter  -->
        <div class="m-2">
        <h2 class=" text-white font-semibold">Our Newsletter</h2>
        <p class="my-4 text-gray-500">There are many variations of passages of form humour, or randomised</p>
        
        <form id="form_news" class="relative w-full flex justify-center items-center">
        <input class="w-full px-4 py-2 my-4 peer" type="email" name="" id="newsletter--footer" placeholder="Your email" required=""
        autocomplete="email" id="newsletter">
        <label for="newsletter--footer" class="absolute pl-4 pointer-events-none left-0 peer-focus:text-[8px] peer-focus:top-4 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:top-4">Your email</label>
        <button id="subscribe" type="submit" class="text-[0px] flex justify-center items-center">
        subscribe<i class="fa-regular fa-paper-plane text-base absolute right-2 text-blue-700"></i>
        </button>
          </form>
          <ul class="flex w-3/4 text-white justify-around ">
            <li><a href="" class="hover:text-gray-500"><i class="fa-brands fa-twitter"></i></a></li>
            <li><a href="" class="hover:text-gray-500"><i class="fa-brands fa-facebook"></i></a></li>
            <li><a href="" class="hover:text-gray-500"><i class="fa-brands fa-pinterest"></i></a></li>
            <li><a href="" class="hover:text-gray-500"><i class="fa-brands fa-instagram"></i></a></li>
            <li><a href="" class="hover:text-gray-500"><i class="fa-brands fa-youtube"></i></a></li>
          </ul>
        </div>

      </div>
      
      <!-- copy & card -->
      <div class="px-4">
        <div class="text-white my-4 text-center">
          © 2023 Gamers - Game Store 
        </div>

        <div>
          <ul class="flex w-3/4 justify-around mx-auto text-white">
            <li><i class="fa-brands fa-cc-visa"></i></li>
            <li><i class="fa-brands fa-cc-mastercard"></i></li>
            <li><i class="fa-brands fa-paypal"></i></li>
            <li><i class="fa-brands fa-bitcoin"></i></li>
          </ul>
        </div>
      </div>

`;

const renderFoot = () => {
    footNewsletter.innerHTML = createFooter();
    footNewsletter.style.background = 'url(https://wallpaperset.com/w/full/a/a/1/5931.jpg)';
    const formNew = document.getElementById('form_news');
    const inputNew = document.getElementById("newsletter--footer");
    //validamos el input
    const inputValidNews = (input) => {
        let valid = false;
        if (!isEmailValid(input)) {
            input.style.border = '1px solid red';
            return;
        }
  
        
        if (subscribe.some(subscribe => subscribe.includes(input.value))) {
            alert("Este correo electrónico ya está suscrito.");
            return;
        };

        input.style.border = "none";
        valid = true;
        return valid;
    };
//validamos el form
    const formN = (e) => {
        e.preventDefault();
        
        if (inputValidNews(inputNew)) {
            subscribe.push(inputNew.value);
            
            saveToLS(subscribe);
            inputNew.value = "";
            alert("¡Gracias por suscribirte!");
        }

    };


    formNew.addEventListener('submit', formN);
};



renderFoot();
