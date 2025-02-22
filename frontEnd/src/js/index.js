/*
    Funcionalidades de la página de inicio
*/

// Variables del dom
let container = document.getElementById('container');
let modalLogin = document.getElementById('login');
let modalRegister = document.getElementById('registro');
let modalRecuperar = document.getElementById('recuperar');
let btn_login = document.getElementById('btn_login');
let btn_register = document.getElementById('btn_registro');
let btn_recuperar = document.getElementById('btn_recuperar')
let btnShowPass = document.getElementById('login_show-pass')
let btnShowPassReg = document.getElementById('register_show-pass')
let btnShowPassReg2 = document.getElementById('register_show-pass2');
let loginAlert = document.getElementById('loginAlert');
let recPassAlert = document.getElementById('recPassAlert');
let emailInput = document.getElementById("recu_correo");
let errorMsg = document.getElementById("error_recu-mail");

//const importToke = require('jsonwebtoken');
//FUNCIONES

//Cambiar de modal
const changeModal = (event) => {
    let aux = event.target;
    //Controlamos si pulsa en un link
    if (aux.tagName === "A") {
        if (aux.textContent === "Login") {
            modalLogin.style.display = "flex";
            modalRegister.style.display = "none"
            modalRecuperar.style.display = "none"
        } else if (aux.textContent === "Registrate") {
            modalRegister.style.display = "flex";
            modalLogin.style.display = "none"
            modalRecuperar.style.display = "none"
        } else if (aux.textContent === "contraseña") {
            modalRecuperar.style.display = "flex";
            modalRegister.style.display = "none"
            modalLogin.style.display = "none"
        }
    }
}

//Mostrar contraseña 
const showPass = (input) => {
    if (input.type === 'password') {
        input.type = 'text';
    } else if (input.type === 'text') {
        input.type = "password";
    }
}

//Cambiar icono 
const changeIconEye = (btn) => {
    let spanEye = btn.children[0];
    spanEye.classList.toggle('mdi-eye-outline');
    spanEye.classList.toggle('mdi-eye-off-outline');
}

//ENVIAR CORREO DE RECUPERACION
document.getElementById("btn_recuperar").addEventListener("click", async () => {
    const email_usu = emailInput.value.trim();
    console.log("Enviando email:", email_usu);
    try {
        const response = await fetch('http://localhost:3000/sanitaria/usuarios/recuperar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email_usu: email_usu })
        });
        console.log("Código de estado:", response.status);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, mensaje: ${errorMessage}`);
        }
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        showLogin(); 
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        recPassAlert.textContent = "Usuario no encontrado, registrate primero";
        setTimeout(() => {
            recPassAlert.textContent = "";
        }, 2000)
    }
});

//Cambiar de modal
const showLogin = () => {
    emailInput.value = "";
    modalLogin.style.display = "flex";
    modalRegister.style.display = "none"
    modalRecuperar.style.display = "none"
    loginAlert.textContent = "Comprueba en la bandeja de entrada de tu correo";
    setTimeout(() => {
        loginAlert.textContent = "";
    
    }, 2500);
}
// Función para validar el correo
const validarCorreo = (correo) => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
};

// Función para mostrar el error
const mostrarError = (mensaje) => {
    errorMsg.textContent = mensaje;
    errorMsg.classList.remove("hidden");
    errorMsg.classList.add("text-red-500");
};

// Simulación de envío de correo
const enviarCorreo = (email) => {
    errorMsg.classList.add("hidden");
    btn_recuperar.textContent = "Enviando...";
    btn_recuperar.disabled = true;

    setTimeout(() => {
        btn_recuperar.textContent = "Enviar";
        btn_recuperar.disabled = false;
        alert(`Se ha enviado un enlace de recuperación a ${email}`);
    }, 700); //Envío de 2 segundos
};

// Añadir botón de roles solo para administradores
const addAdminButton = (rol) => {
    if (rol === 'A') {
        const adminButton = document.createElement('button');
        adminButton.textContent = 'Administrar Roles';
        adminButton.className = 'bg-teal-400 rounded-md p-2 w-[200px] hover:bg-teal-200';
        adminButton.onclick = () => {
            window.location.href = './pages/roles.html';
        };
        container.appendChild(adminButton);
    }
};


//EVENTOS
container.addEventListener('click', changeModal);
btnShowPass.addEventListener('click', (event) => {
    event.preventDefault();
    showPass(logPass);
    changeIconEye(btnShowPass);
});
btnShowPassReg.addEventListener('click', (event) => {
    event.preventDefault();
    showPass(regPass);
    changeIconEye(btnShowPassReg);
});
btnShowPassReg2.addEventListener('click', (event) => {
    event.preventDefault();
    showPass(regPass2);
    changeIconEye(btnShowPassReg2);
});
