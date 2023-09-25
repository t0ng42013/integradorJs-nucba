const logForm = document.getElementById('logForm');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const message = document.getElementById("message-error");

const users = JSON.parse(localStorage.getItem('users'));

const saveToSessionStorage = (user) => {
  sessionStorage.setItem("activeUser", JSON.stringify(user));
};

const isValidEmail = (input) => {
  return users.some((user) => user.email.trim().toLowerCase() === input.value.trim().toLowerCase());
}

const isEmpty = (input) => {
    return !input.value.trim().length;
};

const isMatch = (input) =>{
  const user = users.find(user => user.email === inputEmail.value.trim());
  return user.password === input.value.trim();
}

const showErrorMessage = (mess) => {
    message.textContent = mess;
}

const isValidAccount = () => {
    let valid = false;

    if (isEmpty(inputEmail)) {
        showErrorMessage('El email está vacío');
        return valid;
    }

    if (!isValidEmail(inputEmail)) {
        showErrorMessage('El email no está registrado');
        return valid;
    }
    
    if (isEmpty(inputPassword)) {
         showErrorMessage('Contraseña requerida');
         return valid;
    }

    if (!isMatch(inputPassword)) {
         showErrorMessage('Contraseña incorrecta');
         return valid;
    }

    valid = true;
    alert('Ingreso exitoso');
    message.textContent = '';   
    return valid; 
};

const validateLogin = (e) => {
    e.preventDefault();

    if (isValidAccount()) {
        const user = users.find(user => user.email.trim().toLowerCase() === inputEmail.value.trim().toLowerCase());
        saveToSessionStorage(user);
        console.log('Ingreso exitoso');
        e.preventDefault();
        window.location.href ='/index.html';
    }
};

const init = () => {
    logForm.addEventListener('submit', validateLogin);
};
init();
