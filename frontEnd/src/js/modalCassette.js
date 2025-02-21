/*
    Funciones del Modal Añadir Cassettes
    Abrir y cerrar modal, enviar form del modal y crear cassettes en la lista de cassettes
*/

const contAddCassettes = document.getElementById('cassetteTableBody');

//Funcion para obtener el token
const getAuthToken = () =>{
    // Obtener el token del usuario
    const token = sessionStorage.getItem('usuarioLoggeado')
    const tokenValue = JSON.parse(token)
    //Si no existe token volvemos al usuario al index
    if (!tokenValue) {
        location.href = "./../index.html";
        return null
    }
    //Si existe el token
    return tokenValue.success;
}

// Función para abrir el modal de añadir cassettes
const abrirModal = () => {
    // Mostar el modal
    modalOverlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    // Animación de entrada
    setTimeout(() => {
        modalContent.classList.remove("scale-95", "opacity-0");
    }, 10);
};

// Función para cerrar el modal
const cerrarModal = () => {
    // Ocultar el modal
    modalOverlay.classList.add("hidden");
    modal.classList.add("hidden");
    errorMessage.textContent = "";
    // Animación de salida
    setTimeout(() => {
    modalContent.classList.add("scale-95");
    }, 300);
};

// Event listeners para abrir y cerrar el modal
openModalBtn.addEventListener("click", () => {
    restringirFechaMinima();
    abrirModal();
});
closeModalBtn.addEventListener("click", cerrarModal);
modalOverlay.addEventListener("click", cerrarModal);

// Petición para obtener todos los cassettes que existen 
const loadCassettes = async () => {
    const token = getAuthToken();
    // Hacer GET
    const response = await fetch('http://localhost:3000/sanitaria/cassettes/',{
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });
    // Verificar si la respuesta es correcta y mostrar cassettes
    const data = await response.json();
    showCassettes(data);
}

// Mostrar por pantalla los cassettes
const showCassettes = (cassettes) => {
    // Limpiar tabla y posibles errores
    contAddCassettes.innerHTML = "";
    errorCrearMuestra.textContent = "";
    errorMuestra.textContent = "";

    // Añadir los cassettes a la tabla
    let fragment = document.createDocumentFragment();
    cassettes.forEach(cassette => {
        fragment.appendChild(crearFilaCassette(cassette));
    });
    contAddCassettes.appendChild(fragment);
}

/* ########################################
   ###   Función para añadir Cassettes  ###
   ######################################*/

// Función para validar y enviar el formulario de añadir cassettes al backend
const enviarFormulario = async (event) => {
    // Obtener el token del usuario
    const token = getAuthToken();
    if (!token) {
        console.log("No existe token");
        return null;
    }
    event.preventDefault();

    // Obtener los valores de los inputs
    const descripcion = descripcionInput.value.trim();
    const fecha = fechaInput.value.trim();
    const organo = organoInput.value.trim();
    const clave = claveInput.value.trim();
    const caracteristicas = caracteristicasInput.value.trim() || "Sin características";
    const observaciones = observacionesInput.value.trim() || "Sin observaciones";
    
    // Validar los campos obligatorios
    if (!descripcion || !fecha || !organo || !clave) {
        errorMessage.textContent = "Los campos Descripción, Fecha, Órgano y Clave son obligatorios.";
        return;
    }

    // Crear el objeto cassette
    const nuevoCassette = {
        fecha_cassette: fecha,
        descripcion_cassette: descripcion,
        organo_cassette: organo,
        clave_cassette: clave,
        caracteristicas_cassette: caracteristicas,
        observaciones_cassette: observaciones,
    };

    // Enviar cassette al backend
    try {
        // Verificar si la clave ya existe
        const existingCassettesResponse = await fetch('http://localhost:3000/sanitaria/cassettes/', {
            headers: {
                'Content-Type': 'application/json',
                'user-token': token,
            }
        });
        // Verficiar si la respuesta es correcta
        if (!existingCassettesResponse.ok) {
            throw new Error("Error al verificar cassettes existentes.");
        }
        // Verificar si la clave ya existe
        const existingCassettes = await existingCassettesResponse.json() || null;
        console.log(existingCassettes);
        if (existingCassettes) {
            const claveExistente = existingCassettes.some(cassette => cassette.clave_cassette === clave);
            // Error si la clave ya existe
            if (claveExistente) {
                errorMessage.textContent = "La clave de un cassette no puede repetirse";
                return;
            }
        }

        // Enviar el nuevo cassette al backend
        const response = await fetch('http://localhost:3000/sanitaria/cassettes/', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'user-token': token
            },
            body: JSON.stringify(nuevoCassette)
        });

        // Verificar si la respuesta es correcta
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error en la API: ${response.status} ${response.statusText} - ${errorData.error || 'Sin detalles'}`);
        }

        const data = await response.json();
        console.log("Cassette agregado correctamente:", data);

        // Agregar solo el nuevo cassette en la tabla sin recargar
        contAddCassettes.appendChild(crearFilaCassette(data));

        cerrarModal();
        cassetteForm.reset();

    // En caso de error:
    } catch (error) {
        console.error("Error al enviar el cassette:", error);
        errorMessage.textContent = "Error al añadir el cassette, verifica los datos e intenta de nuevo.";
    }
};

// Envío del formulario

cassetteForm.addEventListener("submit", enviarFormulario);

// Función para crear cada fila de cassettes
const crearFilaCassette = (cassette) => {
    let fila = document.createElement('tr');
    fila.classList.add("border-b", "hover:bg-gray-100");

    // Columna fecha
    let fecha = document.createElement('td');
    fecha.textContent = cassette.fecha_cassette;
    fecha.classList.add("p-2", "text-gray-700", "text-left");
    fila.appendChild(fecha);

    // Columna descripción
    let descripcion = document.createElement('td');
    descripcion.textContent = cassette.descripcion_cassette;
    descripcion.classList.add("p-2", "text-gray-700", "text-left");
    fila.appendChild(descripcion);

    // Columna órgano
    let organo = document.createElement('td');
    organo.textContent = cassette.organo_cassette;
    organo.classList.add("p-2", "text-gray-700", "text-left");
    fila.appendChild(organo);

    // Columna clave
    let clave = document.createElement('td');
    clave.textContent = cassette.clave_cassette;
    clave.classList.add("p-2", "text-gray-700", "text-left");
    fila.appendChild(clave);

    // Columna icono
    let columIcono = document.createElement('td');
    columIcono.classList.add("p-2", "text-center");

    // Icono del cassette
    let icono = document.createElement('i');
    icono.classList.add("p-none", "mt-4", "icono", "fa-solid", "fa-file", "relative", "w-8", "h-8", "text-teal-500", "detalle-cassette", "cursor-pointer", "hover:text-teal-400", "active:text-teal-700");
    icono.setAttribute("data-id", cassette.id_cassette);

    // Añadir icono a la fila
    columIcono.appendChild(icono);
    fila.appendChild(columIcono);

    return fila;
};

// Devolver ID del cassette donde se hace click
const returnIdOfCassette = (event) => {
    let aux = event.target;
    if (aux.tagName === "I") {
        return aux.getAttribute("data-id");
    } else {
        return null;
    }
};

// Función para actualizar los detalles de la muestra
const updateCassetteDetails = (cassette) => {
    detalleDescripcion.textContent = cassette.descripcion_cassette;
    detalleFecha.textContent = cassette.fecha_cassette;
    detalleOrgano.textContent = cassette.organo_cassette;
    detalleCaracteristicas.textContent = cassette.caracteristicas_cassette;
    detalleObservaciones.textContent = cassette.observaciones_cassette;
    detalleClave.textContent = cassette.clave_cassette;
};

/* ###############################################
   ###   Restricción de fecha en formulario   ###
   #############################################*/

// Función para establecer la fecha mínima como la actual
const restringirFechaMinima = () => {
    const fechaInputCrear = document.getElementById("fechaInput");
    // Establecer la fecha mínima la de hoy
    if (fechaInputCrear) {
        const hoy = new Date().toISOString().split("T")[0];
        fechaInputCrear.setAttribute("min", hoy);
    }
};

// Aplicar la restricción cuando se cargue la página
document.addEventListener("DOMContentLoaded", restringirFechaMinima);
document.addEventListener("DOMContentLoaded", loadCassettes);
