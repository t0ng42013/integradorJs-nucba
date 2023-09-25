//traer datos de LS
const subscribe = JSON.parse(localStorage.getItem('subscribe')) || [];
//guardar subscribe
const saveToLS = () => {
  localStorage.setItem('subscribe', JSON.stringify(subscribe));
};

const background = "https://wallpaperset.com/w/full/a/a/1/5931.jpg";

const footNewsletter = document.getElementById("footerContainer");

const createFooter = () => `
  <div class="hidden lg:flex justify-around items-start text-white">
    <div class="max-w-1/4">
      <h2 class="text-3xl mb-8">Contact Us</h2>
      <ul class=" text-gray-200">
        <li class="my-4">
          <i class="fa fa-map-marker pr-4" aria-hidden="true"></i>
          <span>Gamers - Game Store - Av. Colón 1234 <br>
            Córdoba, Argentina
          </span>
        </li>
        <li class="my-4">
          <i class="fa fa-phone pr-4" aria-hidden="true"></i>
          <span class="my-4 ">(+54)012-345-6789</span>
        </li>
        <li class="my-4">
          <i class="fa fa-envelope  pr-4" aria-hidden="true"></i>
          <a href="mailto:tonga88@live.com.ar">example@email.com</a>
        </li>
      </ul>
    </div>
    <div class="max-w-1/4">
      <h2 class=" text-3xl mb-8">Information</h2>
      <ul class=" text-gray-200 [&_li]:my-2">
        <li><a href="/assets/pages/information.html?name=Refund"> Shipping & Refund
          </a></li>
        <li><a href="/assets/pages/information.html?name=Terms">
            Terms and Conditions
          </a></li>
        <li><a href="/assets/pages/information.html?name=Buyers">
            Policy for Buyers
          </a></li>
        <li><a href="/assets/pages/information.html?name=Sellers">Policy for Sellers</a>
        </li>
      </ul>
    </div>
    <div class="max-w-1/4 w-1/4">
      <h2 class=" text-3xl mb-8">Our Newsletter</h2>
      <p class="my-4 text-gray-200">There are many variations of passages of form humour, or randomised</p>
      <form id="form_news" class="relative w-full flex justify-center items-center">
        <input class=" w-full px-4 py-2 my-4 peer" type="email" name="" id="newsletter--footer" placeholder="Your email"
          required="" autocomplete="email" id="newsletter">
        <label for="newsletter--footer"
          class="text-gray-700 absolute pl-4 pointer-events-none left-0 peer-focus:text-[8px] peer-focus:top-4 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:top-4">Your
          email</label>
        <button id="subscribe" type="submit" class="text-[0px] flex justify-center items-center">
          subscribe<i class="fa-regular fa-paper-plane text-base absolute right-2 text-blue-700"></i>
        </button>
      </form>
      <ul class="flex w-3/4 text-white justify-around ">
        <li><a href="#" class="hover:text-gray-500"><i class="fa-brands fa-twitter"></i></a></li>
        <li><a href="#" class="hover:text-gray-500"><i class="fa-brands fa-facebook"></i></a></li>
        <li><a href="#" class="hover:text-gray-500"><i class="fa-brands fa-pinterest"></i></a></li>
        <li><a href="#" class="hover:text-gray-500"><i class="fa-brands fa-instagram"></i></a></li>
        <li><a href="#" class="hover:text-gray-500"><i class="fa-brands fa-youtube"></i></a></li>
      </ul>
    </div>
  </div>

     <div class="px-4 bg-[url(${background})] sm:px-16 md:max-w-[800px] lg:hidden">
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
             <li><a href="/assets/pages/information.html?name=Refund">                           Shipping & Refund
                          </a></li>
             <li><a href="/assets/pages/information.html?name=Terms">
                            Terms and Conditions 
                          </a></li>            
             <li><a href="/assets/pages/information.html?name=Buyers">
                            Policy for Buyers
                          </a></li>
             <li><a href="/assets/pages/information.html?name=Sellers">Policy for Sellers</a>                     
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
            <li><a href="#" class="hover:text-gray-500"><i class="fa-brands fa-twitter"></i></a></li>
            <li><a href="#" class="hover:text-gray-500"><i class="fa-brands fa-facebook"></i></a></li>
            <li><a href="#" class="hover:text-gray-500"><i class="fa-brands fa-pinterest"></i></a></li>
            <li><a href="#" class="hover:text-gray-500"><i class="fa-brands fa-instagram"></i></a></li>
            <li><a href="#" class="hover:text-gray-500"><i class="fa-brands fa-youtube"></i></a></li>
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
