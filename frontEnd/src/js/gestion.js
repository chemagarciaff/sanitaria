/*
    JavaScript general de gestion.html

*/
// ! Versión antigua del js de gestion.html con todo en un fichero
// ! ELIMINAR ARCHIVO (ya se han dividido el js en varios js)

/* #############################
   ###   Elementos del DOM   ###
   ###########################*/

// Modal Añadir Cassette
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalOverlay = document.getElementById("modal-overlay");

const descripcionInput = document.getElementById("descripcionInput");
const fechaInput = document.getElementById("fechaInput");
const organoInput = document.getElementById("organoInput");
const caracteristicasInput = document.getElementById("caracteristicasInput");
const observacionesInput = document.getElementById("observacionesInput");

const cassetteForm = document.getElementById("cassetteForm");
const cassetteTableBody = document.getElementById("cassetteTableBody");
const errorMessage = document.getElementById("error-message");

// Botones Cassette
const ordenarFechaBtn = document.getElementById("ordenarFecha");
const ordenarDescripcionBtn = document.getElementById("ordenarDescripcion");
const ordenarOrganoBtn = document.getElementById("ordenarOrgano");

// Inputs y select Header
const filtrarOrgano = document.getElementById("filtrarOrgano");
const fechaInicio = document.getElementById("fechaInicio");
const fechaFin = document.getElementById("fechaFin");

// Detalle del cassette
const detalleDescripcion = document.getElementById("descripcion");
const detalleFecha = document.getElementById("fecha");
const detalleOrgano = document.getElementById("organo");
const detalleCaracteristicas = document.getElementById("caracteristicas");
const detalleObservaciones = document.getElementById("observaciones");

// Eliminar y modificar cassettes
const editarCassetteBtn = document.getElementById("btnEditarCassette");
const eliminarCassetteBtn = document.getElementById("btnEliminarCassette");

// Modales eliminar y modificar cassettes
const modalEliminar = document.getElementById("modalEliminarCassette");
const modalEditar = document.getElementById("modalEditarCassette");

// Modal de añadir muestra
const modalMuestra = document.getElementById("modalMuestra");
const modalMuestraContent = document.getElementById("modalMuestraContent");

// Modal de muestras
const openModalMuestraBtn = document.getElementById("openModalMuestraBtn");
const closeModalMuestraBtn = document.getElementById("closeModalMuestra");
const muestraForm = document.getElementById("muestraForm");
const errorMuestra = document.getElementById("errorMuestra");


let ordenAscendente = true;
let cassetteSeleccionado = null;

/* ###############################################
   ###   Funcines del Modal Añadir Cassettes   ###
   #############################################*/

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

// Función para validar y enviar formulario del modal de añadir cassettes
const enviarFormulario = (event) => {
    event.preventDefault();

    const descripcion = descripcionInput.value.trim();
    const fecha = fechaInput.value.trim();
    const organo = organoInput.value.trim();

    if (!descripcion || !fecha || !organo) {
        errorMessage.textContent = "Rellena los campos obligatorios";
        return;
    }

    const newRow = document.createElement("tr");
    newRow.classList.add("border-b");
    
    const caracteristicas = caracteristicasInput.value.trim() || "Información no disponible";
    const observaciones = observacionesInput.value.trim() || "Sin observaciones";
    
    newRow.setAttribute("data-caracteristicas", caracteristicas);
    newRow.setAttribute("data-observaciones", observaciones);
    
    newRow.innerHTML = `
        <td class="p-2">${fecha}</td>
        <td class="p-2">${descripcion}</td>
        <td class="p-2">${organo}</td>
        <td class="p-2">
            <div class="relative w-8 h-8 text-teal-500 detalle-cassette cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-teal-600 icono hover:text-teal-400 active:text-teal-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"></path>
                </svg>
            </div>
        </td>
    `;

    cassetteTableBody.appendChild(newRow);
    cerrarModal();
    cassetteForm.reset();
    agregarEventosDetalle();
};


/* ################################
   ###   Funciones del Header   ###
   ##############################*/

// Función para filtrar la tabla por órgano
const filtrarPorOrgano = () => {
    let filtro = filtrarOrgano.value;
    // Obtiene todas las filas y las pasa a un array
    let filas = Array.from(cassetteTableBody.children);

    filas.forEach(fila => {
        // Obtiene el contenido de la tercera celda (los organos)
        let organo = fila.cells[2].textContent;
        // Comprobar si hay filtro o si coincide con el órgano
        if (filtro === "" || organo === filtro) {
            // Mostrar las filas que coincidan con el filtro
            fila.style.display = "";
        } else {
            // Si la fila no coincide se oculta
            fila.style.display = "none";
        }

    });
};

// Función para filtrar por fecha o rango de fechas
const filtrarPorFecha = () => {
    // Convertir los valores de los inptus en objetos date
    let fechaInicial = null;
    let fechaFinal = null;
    
    if (fechaInicio.value) {
        fechaInicial = new Date(fechaInicio.value);
    }
    
    if (fechaFin.value) {
        fechaFinal = new Date(fechaFin.value);
    }
    // Obtiene todas las filas en un array
    let filas = Array.from(cassetteTableBody.children);
    // Obtiene la fecha de cada cassette
    filas.forEach(fila => {
        let fechaCassette = new Date(fila.cells[0].textContent);

        // Si solo hay fecha de inicio, mostrar solo esa fecha exacta
        if (fechaInicial && !fechaFinal && fechaCassette.toDateString() !== fechaInicial.toDateString()) {
            fila.style.display = "none";
        }
        // Si hay fecha de inicio y fecha de fin, mostrar el rango
        else if (fechaInicial && fechaFinal && (fechaCassette < fechaInicial || fechaCassette > fechaFinal)) {
            fila.style.display = "none";
        } 
        // Si no hay fecha seleccionada, mostrar todo
        else {
            fila.style.display = "";
        }
    });
};

/* ################################
   ###   Funciones de Cassette  ###
   ##############################*/

// Función para ordenar cualquier columna
const ordenarTabla = (columna) => {
    // Obtener todas las filas y pasarlo a un array
    const filas = [...cassetteTableBody.children];

    // Ordenar el array de filas ordenando de A a Z y vicebersa 
    /* (Primero se obtiene el texto de la celda en la columna seleccionada y luego 
       localeCompare compara las cadenas de texto) */
    filas.sort((a, b) => 
        ordenAscendente 
            ? a.cells[columna].textContent.localeCompare(b.cells[columna].textContent)
            : b.cells[columna].textContent.localeCompare(a.cells[columna].textContent)
    );
    // Invierte el orden para que pase de A a Z, a Z a A
    ordenAscendente = !ordenAscendente;
    cassetteTableBody.replaceChildren(...filas);
};


// Función para actualizar el detalle del cassette seleccionado
const mostrarDetallesCassette = (fila) => {
    cassetteSeleccionado = fila

    // Actualizar la sección de detalles
    detalleDescripcion.textContent = fila.cells[1].textContent;
    detalleFecha.textContent = fila.cells[0].textContent;
    detalleOrgano.textContent = fila.cells[2].textContent;
    detalleCaracteristicas.innerText = fila.getAttribute("data-caracteristicas") || "Información no disponible";
    detalleObservaciones.innerText = fila.getAttribute("data-observaciones") || "Sin observaciones";

    // Resaltar la fila seleccionada
    document.querySelectorAll("#cassetteTableBody tr").forEach(row => row.classList.remove("bg-teal-100"));
    fila.classList.add("bg-teal-100");
};

// Función para agregar el evento de clic en el ícono de cada fila
const agregarEventosDetalle = () => {
    document.querySelectorAll("#cassetteTableBody tr").forEach(fila => {
        const botonDetalle = fila.querySelector(".detalle-cassette");
        if (botonDetalle) {
            botonDetalle.addEventListener("click", () => mostrarDetallesCassette(fila));
        }
    });
};


/* ################################################
   ###   Funciones botones Detalles Cassettes   ###
   ##############################################*/

// Función para abrir el modal de eliminar
const abrirModalEliminar = () => {
    if (!cassetteSeleccionado || !modalEliminar) return;
    modalEliminar.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
};

// Función para cerrar el modal de eliminar
const cerrarModalEliminar = () => {
    modalEliminar.classList.add("hidden");
    modalOverlay.classList.add("hidden");
};

// Función para eliminar cassette
const eliminarCassette = () => {
    // Verificar si el cassete seleccionado existe
    if (!cassetteSeleccionado) return;
    
    if (cassetteSeleccionado.classList.contains("bg-teal-100")) {
        detalleDescripcion.textContent = "";
        detalleFecha.textContent = "";
        detalleOrgano.textContent = "";
        detalleCaracteristicas.textContent = "";
        detalleObservaciones.textContent = "";
    }

    cassetteSeleccionado.remove();
    cassetteSeleccionado = null;
    cerrarModalEliminar();
};


// Función para abrir el modal de editar
const abrirModalEditar = () => {
    // Verificar si el cassete seleccionado y el modal existe
    if (!cassetteSeleccionado || !modalEditar) return;
    // Rellenar campos del modal
    document.getElementById("editarDescripcion").value = cassetteSeleccionado.cells[1].textContent;
    document.getElementById("editarFecha").value = cassetteSeleccionado.cells[0].textContent;
    document.getElementById("editarOrgano").value = cassetteSeleccionado.cells[2].textContent;
    document.getElementById("editarCaracteristicas").value = cassetteSeleccionado.getAttribute("data-caracteristicas");
    document.getElementById("editarObservaciones").value = cassetteSeleccionado.getAttribute("data-observaciones");

    modalEditar.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
};

// Función para cerrar el modal de editar
const cerrarModalEditar = () => {
    modalEditar.classList.add("hidden");
    modalOverlay.classList.add("hidden");
};

// Guardar cambios al editar
const guardarEdicionCassette = (event) => {
    event.preventDefault();
    // Verificar si el cassete seleccionado existe
    if (!cassetteSeleccionado) return;

    // Actualiza los nuevos valores en la fila
    cassetteSeleccionado.cells[1].textContent = document.getElementById("editarDescripcion").value;
    cassetteSeleccionado.cells[0].textContent = document.getElementById("editarFecha").value;
    cassetteSeleccionado.cells[2].textContent = document.getElementById("editarOrgano").value;
    cassetteSeleccionado.setAttribute("data-caracteristicas", document.getElementById("editarCaracteristicas").value);
    cassetteSeleccionado.setAttribute("data-observaciones", document.getElementById("editarObservaciones").value);

    mostrarDetallesCassette(cassetteSeleccionado);
    cerrarModalEditar();
};


/* ###############################################
   ###   Funciones del Modal Añadir Muestras   ###
   #############################################*/

// Función para abrir el modal de muestras
const abrirModalMuestra = () => {
    modalOverlay.classList.remove("hidden");
    modalMuestra.classList.remove("hidden");
    setTimeout(() => {
        modalMuestraContent.classList.remove("scale-95");
    }, 10);
};

// Función para cerrar el modal de muestras
const cerrarModalMuestra = () => {
    modalMuestraContent.classList.add("scale-95");
    setTimeout(() => {
        modalOverlay.classList.add("hidden");
        modalMuestra.classList.add("hidden");
        errorMuestra.textContent = "";
    }, 300);
};

// Función para validar y enviar el formulario de la muestra
const enviarFormularioMuestra = (event) => {
    event.preventDefault();

    const descripcion = document.getElementById("descripcionMuestra").value.trim();
    const fecha = document.getElementById("fechaMuestra").value.trim();
    const tincion = document.getElementById("tincionMuestra").value.trim();
    const imagen = document.getElementById("imagenMuestra").files[0];

    if (!descripcion || !fecha || !tincion) {
        errorMuestra.textContent = "Rellena los campos obligatorios";
        return;
    }

    // Procesar la imagen si se ha seleccionado
    if (imagen) {
        console.log("Imagen seleccionada:", imagen.name);
    }

    cerrarModalMuestra();
    muestraForm.reset();
};


/* ###########################
   ###   Event Listeners   ###
   #########################*/

// Event Listeners para los inputs de fecha
fechaInicio.addEventListener("change", filtrarPorFecha);
fechaFin.addEventListener("change", filtrarPorFecha);

// Event Listeners para el modal de añadir cassettes
openModalBtn.addEventListener("click", abrirModal);
closeModalBtn.addEventListener("click", cerrarModal);
cassetteForm.addEventListener("submit", enviarFormulario);

// Event Listener para ordenar cassettes en el Header
filtrarOrgano.addEventListener("change", filtrarPorOrgano);
fechaInicio.addEventListener("change", filtrarPorFecha);
fechaFin.addEventListener("change", filtrarPorFecha);

// Event Listener para ordenar cassettes en la cabecera de cassettes
ordenarFechaBtn.addEventListener("click", () => ordenarTabla(0));
ordenarDescripcionBtn.addEventListener("click", () => ordenarTabla(1));
ordenarOrganoBtn.addEventListener("click", () => ordenarTabla(2));

// Event Listener para los modales de eliminar y editar cassettes
editarCassetteBtn.addEventListener("click", abrirModalEditar);
eliminarCassetteBtn.addEventListener("click", abrirModalEliminar);

// Event Listeners para detalles cassettes
document.addEventListener("DOMContentLoaded", agregarEventosDetalle);
document.getElementById("confirmarEliminar").addEventListener("click", eliminarCassette);
document.getElementById("cancelarEliminar").addEventListener("click", cerrarModalEliminar);
document.getElementById("cerrarEliminarModal").addEventListener("click", cerrarModalEliminar);
document.getElementById("cerrarEditarModal").addEventListener("click", cerrarModalEditar);
document.getElementById("formEditarCassette").addEventListener("submit", guardarEdicionCassette);

// Event Listeners modal muestras
openModalMuestraBtn.addEventListener("click", abrirModalMuestra);
closeModalMuestraBtn.addEventListener("click", cerrarModalMuestra);
muestraForm.addEventListener("submit", enviarFormularioMuestra);