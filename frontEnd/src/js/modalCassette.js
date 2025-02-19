//VARIABLES
const contAddCassettes = document.getElementById('cassetteTableBody');

/*
    Funciones del Modal Añadir Cassettes
    Abrir y cerrar modal, enviar form del modal y crear cassettes en la lista de cassettes
*/

//Funcion para obtener el token
const getAuthToken = () =>{
    const token = sessionStorage.getItem('usuarioLoggeado')
    const tokenValue = JSON.parse(token)
    //Si no existe token
    if (!tokenValue) {
        console.log("No existe token");
        return null
    }
    //Si existe el token
    return tokenValue.success;
}
// Función para abrir el modal de añadir cassettes
const abrirModal = () => {
    modalOverlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    
    setTimeout(() => {
        modalContent.classList.remove("scale-95", "opacity-0");
    }, 10);
};

// Función para cerrar el modal
const cerrarModal = () => {
    modalContent.classList.add("scale-95");
    setTimeout(() => {
        modalOverlay.classList.add("hidden");
        modal.classList.add("hidden");
        errorMessage.textContent = "";
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
    if (!token) return;
    const response = await fetch('http://localhost:3000/sanitaria/cassettes/',{
        headers: {
            'Content-Type': 'application/json',
            'user-token': token // 🔥 Ahora se envía el token en la cabecera
        }
    });
    const data = await response.json();
    showCassettes(data);
}

// Mostrar por pantalla los cassettes
const showCassettes = (cassettes) => {
    contAddCassettes.innerHTML = "";

    errorCrearMuestra.textContent = "";
    errorMuestra.textContent = "";

    let fragment = document.createDocumentFragment();

    cassettes.forEach(cassette => {
        fragment.appendChild(crearFilaCassette(cassette));
    });

    contAddCassettes.appendChild(fragment);
}

/*
    Funciones para añadir cassettes
*/

// Función para validar y enviar el formulario de añadir cassettes al backend
const enviarFormulario = async (event) => {
    event.preventDefault();

    const descripcion = descripcionInput.value.trim();
    const fecha = fechaInput.value.trim();
    const organo = organoInput.value.trim();
    const clave = claveInput.value.trim();
    const caracteristicas = caracteristicasInput.value.trim() || "Sin características";
    const observaciones = observacionesInput.value.trim() || "Sin observaciones";

    if (!descripcion || !fecha || !organo || !clave) {
        errorMessage.textContent = "Los campos Descripción, Fecha, Órgano y Clave son obligatorios.";
        return;
    }

    const nuevoCassette = {
        fecha_cassette: fecha,
        descripcion_cassette: descripcion,
        organo_cassette: organo,
        clave_cassette: clave,
        caracteristicas_cassette: caracteristicas,
        observaciones_cassette: observaciones,
    };

    try {
        // Verificar si la clave ya existe
        const existingCassettesResponse = await fetch('http://localhost:3000/sanitaria/cassettes/');
        if (!existingCassettesResponse.ok) {
            throw new Error("Error al verificar cassettes existentes.");
        }

        const existingCassettes = await existingCassettesResponse.json();
        const claveExistente = existingCassettes.some(cassette => cassette.clave_cassette === clave);

        if (claveExistente) {
            errorMessage.textContent = "La clave de un cassette no puede repetirse";
            return;
        }
        const token = getAuthToken();
        if (!token) return;
        // Enviar el nuevo cassette al backend
        const response = await fetch('http://localhost:3000/sanitaria/cassettes/', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'user-token': token
            },
            body: JSON.stringify(nuevoCassette)
        });

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

    } catch (error) {
        console.error("Error al enviar el cassette:", error);
        errorMessage.textContent = "Error al añadir el cassette, verifica los datos e intenta de nuevo.";
    }
};

// Event listener para envío del formulario de cassettes
cassetteForm.addEventListener("submit", enviarFormulario);

// Función para crear cada fila de la tabla de cassettes con el mismo formato de `showCassettes`
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

/* ###############################################
   ###   Restricción de fecha en formulario   ###
   #############################################*/

// Función para establecer la fecha mínima como la actual
const restringirFechaMinima = () => {
    const fechaInputCrear = document.getElementById("fechaInput"); // Obtener elemento dentro de la función
    if (fechaInputCrear) {
        const hoy = new Date().toISOString().split("T")[0];
        fechaInputCrear.setAttribute("min", hoy);
    }
};

// Aplicar la restricción cuando se cargue la página
document.addEventListener("DOMContentLoaded", restringirFechaMinima);
document.addEventListener("DOMContentLoaded", loadCassettes);
