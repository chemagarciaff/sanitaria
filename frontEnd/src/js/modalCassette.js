//VARIABLES
const contIcon = '<div class="relative w-8 h-8 text-teal-500 detalle-cassette cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-teal-600 icono hover:text-teal-400 active:text-teal-700" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"></path></svg></div>'
let contAddCassettes = document.getElementById('cassetteTableBody');
/*
    Funciones del Modal Añadir Cassettes
    Abrir y cerrar modal, enviar form del modal y crear cassettes en la lista de cassettes
*/

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
    restringirFechaMinima(); // Aplicar restricción de fecha al abrir el modal
    abrirModal();
});
closeModalBtn.addEventListener("click", cerrarModal);

//Peticion todos los cassettes que existen 
const loadCassettes = async () =>{
    const reponse = await fetch('http://localhost:3000/sanitaria/cassettes/')
    const data = await reponse.json();
    showCassettes(data)
}
 
//Mostrar por pantalla los cassettes
const showCassettes = (cassettes) =>{
    let fragment = document.createDocumentFragment();
                    //! Cassete =/= Cassette
    cassettes.forEach((cassete) => {
        let fila = document.createElement('tr');
        fila.classList.add("border-b", "hover:bg-gray-100");

        //Columna fecha
        let fecha = document.createElement('td');
        fecha.textContent = cassete.fecha_cassette;
        fecha.classList.add("p-2", "text-gray-700", "text-center"); 
        fila.appendChild(fecha)

        //Columna descripcion
        let descripcion = document.createElement('td');
        descripcion.textContent = cassete.descripcion_cassette;
        descripcion.classList.add("p-2", "text-gray-700", "text-center");
        fila.appendChild(descripcion)

        //Columna organo
        let organo = document.createElement('td');
        organo.textContent = cassete.organo_cassette;
        organo.classList.add("p-2", "text-gray-700", "text-center");
        fila.appendChild(organo)

        //Columna icono
        let columIcono = document.createElement('td')
        columIcono.classList.add("p-2", "text-center");
        
        //Icono
        // let icono = document.createElement('i');
        // icono.classList.add('fa-solid')
        // icono.classList.add('fa-file')
        // icono.id = cassete.id_cassette

        //! Cambiar Icono por Icono SVG
        
        let icono = document.createElement('div');
        icono.classList.add("relative", "w-8", "h-8", "text-teal-500", "detalle-cassette", "cursor-pointer");

        icono.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-teal-600 icono hover:text-teal-400 active:text-teal-700" 
                 viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"></path>
            </svg>
        `;

        

        //Añadir icono
        columIcono.appendChild(icono);
        fila.appendChild(columIcono);
        
        //Fragment
        fragment.appendChild(fila);
    })
    contAddCassettes.appendChild(fragment);
};

/*
    Funciones para añadir cassettes
*/

// Función para validar y enviar el formulario de añadir cassettes al backend
const enviarFormulario = async (event) => {
    event.preventDefault();

    // Capturar valores del formulario
    const descripcion = descripcionInput.value.trim();
    const fecha = fechaInput.value.trim();
    const organo = organoInput.value.trim();
    const caracteristicas = caracteristicasInput.value.trim() || "Sin características";
    const observaciones = observacionesInput.value.trim() || "Sin observaciones";

    // Validación de campos obligatorios
    if (!descripcion || !fecha || !organo) {
        errorMessage.textContent = "Los campos Descripción, Fecha y Órgano son obligatorios.";
        return;
    }

    // Crear objeto para enviar a la API
    const nuevoCassette = {
        fecha_cassette: fecha,  
        descripcion_cassette: descripcion,
        organo_cassette: organo,
        caracteristicas_cassette: caracteristicas,
        observaciones_cassette: observaciones,
    };

    // Comprobación cassettes
    console.log("Enviando cassette:", nuevoCassette);

    try {
        const response = await fetch('http://localhost:3000/sanitaria/cassettes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoCassette)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error en la API: ${response.status} ${response.statusText} - ${errorData.error || 'Sin detalles'}`);
        }

        const data = await response.json();
        console.log("Cassette agregado correctamente:", data);

        // Cerrar modal, resetear formulario y actualizar la lista
        cerrarModal();
        cassetteForm.reset();
        loadCassettes();

    // En caso de error: 
    } catch (error) {
        console.error("Error al enviar el cassette:", error);
        errorMessage.textContent = "Error al añadir el cassette, verifica los datos e intenta de nuevo.";
    }
};

// Event listener para envío del formulario de cassettes
cassetteForm.addEventListener("submit", enviarFormulario);


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
