const modalEliminar = document.getElementById("modalEliminarCassette");
const eliminarCassetteBtn = document.getElementById("btnEliminarCassette");
const confirmarEliminarBtn = document.getElementById("confirmarEliminar");
const cancelarEliminarBtn = document.getElementById("cancelarEliminar");
const cerrarEliminarModalBtn = document.getElementById("cerrarEliminarModal");

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

// Event Listeners
eliminarCassetteBtn.addEventListener("click", abrirModalEliminar);
confirmarEliminarBtn.addEventListener("click", eliminarCassette);
cancelarEliminarBtn.addEventListener("click", cerrarModalEliminar);
cerrarEliminarModalBtn.addEventListener("click", cerrarModalEliminar);
