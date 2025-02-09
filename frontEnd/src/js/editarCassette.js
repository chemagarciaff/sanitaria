/*
    Funcionalidad para editar cassettes
*/

// Función para abrir el modal de edición con los datos actuales
const abrirModalEditar = () => {
    if (!cassetteSeleccionado || !modalEditar) return;

    // Rellenar los campos del modal con los datos del cassette seleccionado
    document.getElementById("editarDescripcion").value = cassetteSeleccionado.cells[1].textContent;
    document.getElementById("editarFecha").value = cassetteSeleccionado.cells[0].textContent;
    document.getElementById("editarOrgano").value = cassetteSeleccionado.cells[2].textContent;
    document.getElementById("editarCaracteristicas").value = cassetteSeleccionado.getAttribute("data-caracteristicas");
    document.getElementById("editarObservaciones").value = cassetteSeleccionado.getAttribute("data-observaciones");

    modalEditar.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
};

// Función para cerrar el modal de edición
const cerrarModalEditar = () => {
    modalEditar.classList.add("hidden");
    modalOverlay.classList.add("hidden");
};

// Guardar cambios al editar
const guardarEdicionCassette = (event) => {
    event.preventDefault();
    if (!cassetteSeleccionado) return;

    // Actualiza los nuevos valores en la fila
    cassetteSeleccionado.cells[1].textContent = document.getElementById("editarDescripcion").value;
    cassetteSeleccionado.cells[0].textContent = document.getElementById("editarFecha").value;
    cassetteSeleccionado.cells[2].textContent = document.getElementById("editarOrgano").value;
    cassetteSeleccionado.setAttribute("data-caracteristicas", document.getElementById("editarCaracteristicas").value);
    cassetteSeleccionado.setAttribute("data-observaciones", document.getElementById("editarObservaciones").value);

    // Actualizar la sección de detalles
    mostrarDetallesCassette(cassetteSeleccionado);

    cerrarModalEditar();
};

// Asignar eventos a los botones del modal de edición
document.getElementById("cerrarEditarModal").addEventListener("click", cerrarModalEditar);
document.getElementById("formEditarCassette").addEventListener("submit", guardarEdicionCassette);
