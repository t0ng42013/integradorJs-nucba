const formContact = document.getElementById("form_contact");
const nameContact = document.getElementById("name");
const emailContact = document.getElementById("email");
const phoneContact = document.getElementById("phone");
const commentsContact = document.getElementById("comments");
const btnSubmitsContact = document.getElementById("btnSubmit");

// funciones auxiliares
const isEmpty = (input) => {
    return !input.value.trim().length
};

const hasNoSpaces = (input) => {
  // Utiliza una expresión regular para buscar espacios en blanco
  const hasSpaces = /\s/.test(input.value);
  // Devuelve lo contrario del resultado (false si contiene espacios, true si no contiene)
  return !hasSpaces;
};

const minMax = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

const isEmailValid = (input) => {
  // Expresión regular para validar direcciones de correo electrónico
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Obtén el valor del input y elimina espacios en blanco al principio y al final
  const inputValue = input.value.trim();

  // Prueba si el valor coincide con la expresión regular
  return emailRegex.test(inputValue);
};

const isPhoneNumberValid = (input) => {
  //Expresión regular para validar telefono de Argentina
  const phoneRegex =  /^(\+54|0)?(11|[2-9]\d{2})([2-9]\d{6})$/;

 const inputValue = input.value.trim();
  // Prueba si el valor coincide con la expresión regular
  return phoneRegex.test(inputValue);
};

const showError = (input, message) => {
  const errSmall = input.parentElement;
  input.style.border = "1px solid red";
  const error = errSmall.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  const errSmall = input.parentElement;
  input.style.border = "1px solid green";
  const error = errSmall.querySelector("small");
  error.textContent = "";
};
// validacion del name y last name
const validName = (input) => {
    let valid = false;
    const minChar = 3;
    const maxChar = 25;

    if (isEmpty(input)) {
        showError(input, "* El campo no puede estar vacio");
        return;
    }

    if (!hasNoSpaces(input)) {
        showError(input, "* El campo no puede tener espacios");
        return;
    }

    if (!minMax(input, minChar, maxChar)) {
        showError(input, "* El campo debe tener mas de 3 caracteres y menos de 25");
        return;
    }

    showSuccess(input);
    valid = true;
    return valid;
};
//validacion de email
const validEmail = (input) => {
    let valid = false;
    if (isEmpty(input)) {
      showError(input, "* El campo no puede estar vacio");
      return;
    }

    if (!isEmailValid(input)) {
        showError(input, "* email invalido");
        return;
    }
    
    showSuccess(input);
    valid = true;
    return valid;
};
//validacion de telefono
const validPhone = (input) => {
    let valid = false;
     if (isEmpty(input)) {
       showError(input, "* El campo no puede estar vacio");
       return;
     }

     if (!isPhoneNumberValid(input)) {
       showError(input, "Telefono invalido");
       return;
     }
      showSuccess(input);
    valid = true;
    return valid;
};
//validacion de comentario
const validComent = (input)  =>{
     if (isEmpty(input)) {
       showError(input, "* El campo no puede estar vacio");
       return false;
     }

     if(input.value.length > 400){
        showError(input, "*No puede tener mas de 400 caracteres")
        return false
     }
     showSuccess(input);
     return true
};
const validateForm = (e) => {
  e.preventDefault();

  let isName = validName(nameContact);
  let isEmail = validEmail(emailContact);
   let isPhone = validPhone(phoneContact);
   let isComment = validComent(commentsContact);
  let isFormValid = isName && isEmail && isPhone && isComment;

  if (isFormValid) {
  alert('gracias por contactarnos')
    nameContact.value = '';
    emailContact.value = '';
    phoneContact.value = '';
    commentsContact.value = '';
  }
};

const initContact = () => {
  formContact.addEventListener("submit", validateForm);
  nameContact.addEventListener("input", () => validName(nameContact));
  emailContact.addEventListener("input", () => validEmail(emailContact));
  phoneContact.addEventListener("input", () => validPhone(phoneContact));
  commentsContact.addEventListener("input", () => validComent(commentsContact));
};

initContact();