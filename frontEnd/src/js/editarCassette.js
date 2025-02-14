/*
    PARTE DE CARLOS PARA EDITAR CASSETTES
*/
const btnEditCassette = document.getElementById('btnEditarCassette');
const modalEditCassette = document.getElementById('modalEditarCassette');
const cerrarModalEdicion = document.getElementById('cerrarEditarModal');
const editarDescripcion = document.getElementById('editarDescripcion');
const editarFecha = document.getElementById('editarFecha');
const editarOrgano = document.getElementById('editarOrgano');
const editarCaracteristicas = document.getElementById('editarCaracteristicas');
const editarObservaciones = document.getElementById('editarObservaciones');
const formEditarCassette = document.getElementById('formEditarCassette');
const fechaInputEditar = document.getElementById("editarFecha");

/* FUNCIONES */
// Función para establecer la fecha mínima como la actual
const restringirFechaMinimaEdicion = () => {
    const hoy = new Date().toISOString().split("T")[0];
    fechaInputEditar.setAttribute("min", hoy);
};
//Abrir modal
const openModalEdition = (event) =>{

    if (!idCassetteGlobal) {
        errorCrearMuestra.textContent = "Debes seleccionar un cassette antes editarlo.";
        return;
    }

    modalOverlay.classList.remove("hidden");
    modalEditCassette.classList.remove("hidden");
    
    setTimeout(() => {
        modalContent.classList.remove("scale-95", "opacity-0");
    }, 10);

    let aux = event.target;
    //Comporbamos si clicka en el logo
    if (aux.tagName === "path" || aux.tagName === "svg") {
        modalEditCassette.classList.remove('hidden');
        showDetailsModalEdition();
    }
}
//Cerrar modal
const closeModalEdition = (event) =>{

    modalContent.classList.add("scale-95");
    setTimeout(() => {
        modalOverlay.classList.add("hidden");
        modalEditCassette.classList.add("hidden");
        errorMessage.textContent = "";
    }, 300);

    let aux = event.target;
    if (aux === cerrarModalEdicion) {
        modalEditCassette.classList.add('hidden');
    }
}
//Mostrar detalles en modal de edicon
const showDetailsModalEdition = () =>{
    //Añadir valor descripcion
    editarDescripcion.value = detalleDescripcion.textContent;
    //Añadir valor fecha
    editarFecha.value = detalleFecha.textContent;
    //Añadir valor organo
    editarOrgano.value = detalleOrgano.textContent;
    //Añadir valor caracteristicas
    editarCaracteristicas.value = detalleCaracteristicas.textContent;
    //Añadir valor observaciones
    editarObservaciones.value = detalleObservaciones.textContent;
}
//Hacer POST a la API con los nuevos datos
const postNewDetailsCassette = async (event) =>{
    event.preventDefault();
    //Creamos el objeto que le vamos a pasar a al API
    const editCassette = {
        fecha_cassette: editarFecha.value,
        descripcion_cassette: editarDescripcion.value,
        organo_cassette: editarOrgano.value,
        caracteristicas_cassette: editarCaracteristicas.value ,
        observaciones_cassette: editarObservaciones.value,
    };
    //Hacemos el PUT
    const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${idCassetteGlobal}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCassette)
    }
    )
    //Si esta correctamente hecho
    if (response.ok) {
        const data = await response.json();
        //Cerramos modal
        modalEditCassette.classList.add('hidden');
        //Volvemos a cargar los cassettes
        loadCassettes();
    }
}

/*EVENTOS*/
btnEditCassette.addEventListener('click',openModalEdition);
cerrarModalEdicion.addEventListener('click',closeModalEdition);
formEditarCassette.addEventListener('submit',postNewDetailsCassette);
document.addEventListener("DOMContentLoaded", restringirFechaMinimaEdicion);
closeModalBtn.addEventListener("click", cerrarModal);
modalOverlay.addEventListener("click", cerrarModal);

// /*
//     Funcionalidad para editar cassettes
//     Abrir modal con la info del cassette seleccionado, cerrar modal y guardar cambios en la API
// */

// // Evitar la doble declaración de variables globales
// if (!window.modalOverlay) {
//     window.modalOverlay = document.getElementById("modal-overlay");
// }
// if (!window.modalEditar) {
//     window.modalEditar = document.getElementById("modalEditarCassette");
// }
// if (!window.editarCassetteBtn) {
//     window.editarCassetteBtn = document.getElementById("btnEditarCassette");
// }
// if (!window.cassetteSeleccionado) {
//     window.cassetteSeleccionado = null;
// }

// const formEditarCassette = document.getElementById("formEditarCassette");

// // Función para abrir el modal de edición con los datos actuales del cassette seleccionado
// const abrirModalEditar = () => {
//     if (!window.cassetteSeleccionado || !window.cassetteSeleccionado.id_cassette) {
//         console.error("No hay cassette seleccionado para editar.");
//         return;
//     }

//     console.log("Abriendo modal de edición para:", window.cassetteSeleccionado.id_cassette);

//     // Rellenar los campos del modal con los datos del cassette seleccionado
//     document.getElementById("editarDescripcion").value = window.cassetteSeleccionado.descripcion_cassette || "";
//     document.getElementById("editarFecha").value = window.cassetteSeleccionado.fecha_cassette || "";
//     document.getElementById("editarOrgano").value = window.cassetteSeleccionado.organo_cassette || "";
//     document.getElementById("editarCaracteristicas").value = window.cassetteSeleccionado.caracteristicas_cassette || "Sin características";
//     document.getElementById("editarObservaciones").value = window.cassetteSeleccionado.observaciones_cassette || "Sin observaciones";

//     // Mostrar el modal
//     window.modalEditar.classList.remove("hidden");
//     window.modalOverlay.classList.remove("hidden");
// };

// // Asegurar que el botón de edición funciona
// document.getElementById("btnEditarCassette").addEventListener("click", abrirModalEditar);


// // Función para cerrar el modal de edición
// const cerrarModalEditar = () => {
//     window.modalEditar.classList.add("hidden");
//     window.modalOverlay.classList.add("hidden");
//     //! ELIMINAR
//     document.getElementById("modalEditarCassette").classList.add("hidden");
//     document.getElementById("modalOverlay").classList.add("hidden");
// };

// // Función para guardar los cambios del cassette editado en la API
// const guardarEdicionCassette = async (event) => {
//     event.preventDefault();

//     if (!window.cassetteSeleccionado || !window.cassetteSeleccionado.id_cassette) {
//         console.error("No hay un cassette válido seleccionado para editar.");
//         return;
//     }

//     console.log("Editando cassette con ID:", window.cassetteSeleccionado.id_cassette);

//     const idCassette = window.cassetteSeleccionado.id_cassette;

//     const descripcion = document.getElementById("editarDescripcion").value.trim();
//     const fecha = document.getElementById("editarFecha").value.trim();
//     const organo = document.getElementById("editarOrgano").value.trim();
//     const caracteristicas = document.getElementById("editarCaracteristicas").value.trim() || "Sin características";
//     const observaciones = document.getElementById("editarObservaciones").value.trim() || "Sin observaciones";

//     if (!descripcion || !fecha || !organo) {
//         console.error("Faltan datos obligatorios.");
//         return;
//     }

//     const cassetteActualizado = {
//         fecha_cassette: fecha,
//         descripcion_cassette: descripcion,
//         organo_cassette: organo,
//         caracteristicas_cassette: caracteristicas,
//         observaciones_cassette: observaciones,
//     };

//     try {
//         const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${idCassette}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(cassetteActualizado),
//         });

//         if (!response.ok) {
//             throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
//         }

//         console.log("Cassette actualizado correctamente.");

//         // Cerrar el modal después de actualizar
//         cerrarModalEdicion();

//         // Recargar la lista de cassettes para reflejar el cambio
//         await loadCassettes();

//     } catch (error) {
//         console.error("Error al actualizar el cassette:", error);
//     }
// };

// // Asignar evento al botón de guardar
// document.getElementById("formEditarCassette").addEventListener("submit", guardarEdicionCassette);

// // Asegurar que al hacer click en cerrar el modal, también se oculta el overlay
// document.getElementById("cerrarEditarModal").addEventListener("click", cerrarModalEdicion);

// // Función para actualizar visualmente la fila del cassette editado
// const actualizarFilaCassette = (idCassette, cassetteEditado) => {
//     const filas = document.querySelectorAll("#cassetteTableBody tr");
//     filas.forEach(fila => {
//         if (fila.dataset.id === idCassette) {
//             fila.cells[0].textContent = cassetteEditado.fecha_cassette;
//             fila.cells[1].textContent = cassetteEditado.descripcion_cassette;
//             fila.cells[2].textContent = cassetteEditado.organo_cassette;

//             // Actualizar los atributos dataset para futuras ediciones
//             fila.dataset.fecha = cassetteEditado.fecha_cassette;
//             fila.dataset.descripcion = cassetteEditado.descripcion_cassette;
//             fila.dataset.organo = cassetteEditado.organo_cassette;
//             fila.dataset.caracteristicas = cassetteEditado.caracteristicas_cassette;
//             fila.dataset.observaciones = cassetteEditado.observaciones_cassette;
//         }
//     });
// };

// // Asignar eventos a los botones del modal de edición
// document.getElementById("cerrarEditarModal").addEventListener("click", cerrarModalEditar);
// formEditarCassette.addEventListener("submit", guardarEdicionCassette);

// // Asignar evento al botón de edición
// editarCassetteBtn.addEventListener("click", abrirModalEditar);

// /* ###############################################
//    ###   Restricción de fecha en edición     ###
//    #############################################*/

// // Seleccionar el input de fecha en el formulario de edición
// const fechaInputEditar = document.getElementById("editarFecha");

// // Función para establecer la fecha mínima como la actual
// const restringirFechaMinimaEdicion = () => {
//     const hoy = new Date().toISOString().split("T")[0];
//     fechaInputEditar.setAttribute("min", hoy);
// };

// // Aplicar la restricción al cargar el modal de edición


