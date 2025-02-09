/*
    Funcionalidad para eliminar cassettes
*/

// Función para abrir el modal de confirmación de eliminación
const abrirModalEliminar = () => {
    if (!cassetteSeleccionado || !modalEliminar) return;
    modalEliminar.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
};

// Función para cerrar el modal de eliminación
const cerrarModalEliminar = () => {
    modalEliminar.classList.add("hidden");
    modalOverlay.classList.add("hidden");
};

// Función para eliminar cassette seleccionado
const eliminarCassette = () => {
    if (!cassetteSeleccionado) return;

    // Eliminar la fila seleccionada
    cassetteSeleccionado.remove();
    cassetteSeleccionado = null;

    // Limpiar la información del detalle
    detalleDescripcion.textContent = "";
    detalleFecha.textContent = "";
    detalleOrgano.textContent = "";
    detalleCaracteristicas.textContent = "";
    detalleObservaciones.textContent = "";

    // Deshabilitar botones
    editarCassetteBtn.classList.add("opacity-50", "cursor-not-allowed");
    eliminarCassetteBtn.classList.add("opacity-50", "cursor-not-allowed");

    cerrarModalEliminar();
};

// Asignar eventos a los botones del modal de eliminación
document.getElementById("confirmarEliminar").addEventListener("click", eliminarCassette);
document.getElementById("cancelarEliminar").addEventListener("click", cerrarModalEliminar);
document.getElementById("cerrarEliminarModal").addEventListener("click", cerrarModalEliminar);
