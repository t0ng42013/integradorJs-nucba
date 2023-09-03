const regForm = document.getElementById('form_reg');
const btnForm = document.getElementById("btnSubmit");
const inputName = document.getElementById("name");
const inputLastName = document.getElementById("lastName");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("password");

//traer datos LS

const users = JSON.parse(localStorage.getItem('users')) || [];

//guardar datos LS

const saveToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users));
};

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

const isEmailExixting = (input) => {
    return users.some(user => user.email.toLowerCase() === input.value.trim().toLowerCase());
};

const isPasswordValid = (input) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=\[{\|};:'",<.>?/\\~]).{8,}$/;
  return passwordRegex.test(input.value);
};

const showError = (input, message) => {
    const errSmall = input.parentElement;
    input.style.border = '1px solid red';
    const error = errSmall.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const errSmall = input.parentElement;
    input.style.border = "1px solid green";
    const error = errSmall.querySelector('small');
    error.textContent = '';

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

    if(isEmailExixting(input)) {
        showError(input, "* email registrado");
        return;
    }

    showSuccess(input);
    valid = true;
    return valid;
};
//validacion de password
const validPassword = (input) => {
    let valid = false;
    const minChar = 8;
    const maxChar = 25;  
    
    if (isEmpty(input)) {
        showError(input, "* El campo no puede estar vacio");
        return;
    }

    if(!isPasswordValid(input)) {
        showError(
          input,
          `La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (!, @, #, $, %, etc.).`
        );
        return;
    }

      showSuccess(input);
      valid = true;
      return valid;
};

const validateForm = (e) => {
    e.preventDefault();

    let isName = validName(inputName);
    let isLastName = validName(inputLastName);
    let isEmail = validEmail(inputEmail);
    let isPassword = validPassword(inputPass);

    let isFormValid = isName && isLastName && isEmail && isPassword;

    if(isFormValid){
        users.push({
            name:inputName.value,
            LastName:inputLastName.value,
            email:inputEmail.value,
            password:inputPass.value
        });
        saveToLocalStorage(users);
       alert("¡Registro exitoso! Tu cuenta ha sido creada con éxito.");       
        window.location.href = './login.html';
    }

};

const init = () => {
    regForm.addEventListener("submit", validateForm);
    inputName.addEventListener('input', () => validName(inputName));
    inputLastName.addEventListener('input', () => validName(inputLastName));
    inputEmail.addEventListener('input', () => validEmail(inputEmail));
    inputPass.addEventListener("input", () => validPassword(inputPass));
};

init();