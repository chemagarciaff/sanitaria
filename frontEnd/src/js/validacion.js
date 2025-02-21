/*
    Validaciones del login, registro y recuperar contraseña
*/

// Variables del dom
let formRegister = document.getElementById('form_register');
let formLogin = document.getElementById('form_login');
let logCorreo = document.getElementById('login_correo');
let logPass = document.getElementById('login_password');
let regNombre = document.getElementById('register_nom');
let regApe = document.getElementById('register_ape');
let regCentro = document.getElementById('register_centro');
let regCorreo = document.getElementById('register_correo');
let regPass = document.getElementById('register_password');
let regPass2 = document.getElementById('register_password2');
let recuCorreo = document.getElementById('recu_correo');
let errorLogMail = document.getElementById('error_log-mail');
let errorLogPass = document.getElementById('error_log-pass');
let errorRegNom = document.getElementById('error_reg-nomb');
let errorRegApe = document.getElementById('error_reg-ape');
let errorRegMail = document.getElementById('error_reg-mail');
let errorRegPass = document.getElementById('error_reg-pass');
let errorRegPass2 = document.getElementById('error_reg-pass2');
let errorRecuMial = document.getElementById('error_recu-mail');

//FUNCIONES
//Validar formulario login
const validateData = () => {

    //Controlamos el correo
    if (logCorreo.validity.valueMissing) {
        errorLogMail.textContent = "El email no puede estar vacio";
        errorLogMail.classList.remove('hidden');
        return false;
    } else if (logCorreo.validity.typeMismatch) {
        errorLogMail.textContent = "El formato de correo no es el correcto";
        errorLogMail.classList.remove('hidden');
        return false;
    }

    //Controlamos la contraseña
    if (logPass.validity.valueMissing) {
        errorLogPass.textContent = "La contraseña no puede estar vacia";
        errorLogPass.classList.remove('hidden');
        return false;
    }

    return true;
}

const validateEmail = async (email) => {

    const result = await fetch("http://localhost:3000/sanitaria/usuarios/email/" + email);

    const status = await result.status;
    const data = await result.json();

    if (status == 404) {
        errorLogMail.textContent = "El correo no esta registrado";
        errorLogMail.classList.remove('hidden');
        return false;
    } else if (status == 200) {
        return true;
    }


}

// Obtener y guardar el token en localStorage
const loadToken = async (user) => {
    try {
        const response = await fetch("http://localhost:3000/sanitaria/usuarios/logUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("token", data.success);
            return data.success;
        } else {
            console.error("No se recibió un token válido");
        }
    } catch (error) {
        console.error("Error obteniendo el token:", error);
    }
};

// Controlar el formulario de login
const validateLoginUser = async (event) => {
    event.preventDefault();

    errorLogMail.textContent = "";
    errorLogPass.textContent = "";

    let user = {
        email_usu: logCorreo.value,
        password_usu: logPass.value,
    };

    if (!validateData()) return;
    if (!(await validateEmail(user.email_usu))) return;

    const token = await loadToken(user);

    if (!token) {
        errorLogPass.textContent = "Error al iniciar sesión";
        errorLogPass.classList.remove('hidden');
        return;
    }

    try {
        const result = await fetch("http://localhost:3000/sanitaria/usuarios/logUser", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                "user-token": token,
            },
        });

        const status = result.status;
        const data = await result.json();

        if (status !== 200) {
            errorLogPass.textContent = "Contraseña incorrecta";
            errorLogPass.classList.remove('hidden');
        } else {
            sessionStorage.setItem("usuarioLoggeado", JSON.stringify(data));
            location.href = "./pages/gestion.html";
        }
    } catch (error) {
        console.error("Error en la autenticación:", error);
    }
};


//Validar formulario registro
const validateRegister = (event) => {

    errorRegNom.textContent = "";
    errorRegApe.textContent = "";
    errorRegMail.textContent = "";
    errorRegPass.textContent = "";
    errorRegPass2.textContent = "";


    //Controlamos el nombre
    if (regNombre.validity.valueMissing) {
        errorRegNom.textContent = "El nombre no puede estar vacio";
        errorRegNom.classList.remove('hidden');
        return false;

    } else if (regNombre.validity.rangeUnderflow) {
        errorRegNom.textContent = "El nombre tiene que contener 3 caracteres";
        errorRegNom.classList.remove('hidden');
        return false;

    }

    //Controlamos el apellido
    if (regApe.validity.valueMissing) {
        errorRegApe.textContent = "El apellido no puede estar vacio";
        errorRegApe.classList.remove('hidden');
        return false;

    } else if (regApe.validity.patternMismatch) {
        errorRegApe.textContent = "El apellido debe empezar por mayuscula y tener 5 caracteres";
        errorRegApe.classList.remove('hidden');
        return false;

    } 

    //Controlamos el correo
    if (regCorreo.validity.valueMissing) {
        errorRegMail.textContent = "El email no puede estar vacio";
        errorRegMail.classList.remove('hidden');
        return false;

    } else if (regCorreo.validity.typeMismatch) {
        errorRegMail.textContent = "El email no tiene el formato correcto";
        errorRegMail.classList.remove('hidden');
        return false;

    } 

    //Controlamos la contraseña
    if (regPass.validity.valueMissing) {
        errorRegPass.textContent = "La contraseña no puede estar vacia";
        errorRegPass.classList.remove('hidden');
        return false;

    } else if (regPass.validity.patternMismatch) {
        errorRegPass.textContent = "La contraseña no tiene el formato correcto";
        errorRegPass.classList.remove('hidden');
        return false;

    } 

    //Controlamos la segunda contraseña
    if (regPass2.validity.valueMissing) {
        errorRegPass2.textContent = "La contraseña no puede estar vacia";
        errorRegPass2.classList.remove('hidden');
        return false;

    } else if (regPass2.validity.patternMismatch) {
        errorRegPass2.textContent = "La contraseña no tiene el formato correcto";
        errorRegPass2.classList.remove('hidden');
        return false;
    }

    return true;
}


//Comprobamos que las contraseñas coinciden
const passwordEqual = () => {
    if (regPass.value === regPass2.value) {
        return true;
    } else {
        errorRegPass2.textContent = "Las contraseñas no coinciden";
        errorRegPass2.classList.remove('hidden');
        return false;
    }
}

//Post del usuario registrado
const createUser = async (event) => {

    event.preventDefault();

    let validacion = validateRegister(event);

    if (!validacion) return

    let passwords = passwordEqual();

    if (!passwords) return

    let userData = {
        nombre_usu: regNombre.value,
        apellidos_usu: regApe.value,
        centro_usu: regCentro.value,
        email_usu: regCorreo.value,
        password_usu: regPass.value,
        rol: "T"
    };

    // Validación de campos antes de enviar
    if (validacion && passwords) {
        // Realizar la solicitud POST
        const result = await fetch("http://localhost:3000/sanitaria/usuarios", {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json',
            },
        })

        const status = await result.status;
        const data = await result.json();

        if (status == 500) {
            errorRegMail.textContent = "Este correo ya esta registrado";
            errorRegMail.classList.remove('hidden');
        } else if (status == 200) {
            location.reload();
        }
    } else {
        console.error("Validación o contraseñas no son correctas.");
        // Si las validaciones fallan, podrías mostrar un mensaje de error
    }

}

//Validar formulario controlar pass
const validateRecuPass = (event) => {
    event.preventDefault();
    let validacion = true;
    //Controlamos el correo
    if (recuCorreo.validity.valueMissing) {
        errorRecuMial.textContent = "El email no puede estar vacio";
        errorRecuMial.classList.remove('hidden');
        validacion = false;
        return validacion;
    } else if (recuCorreo.validity.typeMismatch) {
        errorRecuMial.textContent = "El email no tiene el formato correcto";
        errorRecuMial.classList.remove('hidden');
        validacion = false;
        return validacion
    } else if (recuCorreo.validity.valid) {
        errorRecuMial.textContent = "";
        errorRecuMial.classList.add('hidden');
    }

    return validacion;
}

formRegister.addEventListener('submit', createUser);
formLogin.addEventListener('submit', validateLoginUser)