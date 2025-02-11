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
let emailInput = document.getElementById("recu_correo");
let errorMsg = document.getElementById("error_recu-mail");

//const importToke = require('jsonwebtoken');
//FUNCIONES

//Cambiar de modal
const changeModal = (event) =>{
    let aux = event.target;
    //Controlamos si pulsa en un link
    if (aux.tagName === "A") {
        if(aux.textContent === "Login"){
        modalLogin.style.display = "flex";
        modalRegister.style.display = "none"
        modalRecuperar.style.display = "none"
    }else if(aux.textContent === "Registrate"){
        modalRegister.style.display = "flex";
        modalLogin.style.display = "none"
        modalRecuperar.style.display = "none"
    }else if(aux.textContent === "contraseña"){
        modalRecuperar.style.display = "flex";
        modalRegister.style.display = "none"
        modalLogin.style.display = "none"
    }
    }
}
//Mostrar contraseña 
const showPass = (input) =>{
    if (input.type === 'password') {
        input.type = 'text';
    }else if (input.type === 'text') {
        input.type = "password";
    }
}
//Cambiar icono 
const changeIconEye = (btn) =>{
    let spanEye = btn.children[0];
    spanEye.classList.toggle('mdi-eye-outline');
    spanEye.classList.toggle('mdi-eye-off-outline');
}
//Coprobar si existe el user
const compUser = (event) =>{

    let user = validateLoginUser(event);
    const token = importToke.j

    
}
//Validacion de inicio de sesion
const loginUser = (event) =>{
    validateLoginUser(event)
}

////ENVIAR CORREO DE RECUPERACION
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
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
    }
});

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
    }, 2000); //Envío de 2 segundos
};

//EVENTOS
container.addEventListener('click',changeModal);
btnShowPass.addEventListener('click', () => {
    showPass(logPass);
    changeIconEye(btnShowPass);
});
btnShowPassReg.addEventListener('click', () => {
    showPass(regPass);
    changeIconEye(btnShowPassReg);
});
btnShowPassReg2.addEventListener('click', () => {
    showPass(regPass2);
    changeIconEye(btnShowPassReg2);
});
btn_login.addEventListener('click', loginUser);
//btn_register.addEventListener('click',createUser);
