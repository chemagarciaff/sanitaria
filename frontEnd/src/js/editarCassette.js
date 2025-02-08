const modalEditar = document.getElementById("modalEditarCassette");
const editarCassetteBtn = document.getElementById("btnEditarCassette");
const cerrarEditarModalBtn = document.getElementById("cerrarEditarModal");
const formEditarCassette = document.getElementById("formEditarCassette");

// Función para abrir el modal de editar
const abrirModalEditar = () => {
    if (!cassetteSeleccionado || !modalEditar) return;

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
    if (!cassetteSeleccionado) return;

    cassetteSeleccionado.cells[1].textContent = document.getElementById("editarDescripcion").value;
    cassetteSeleccionado.cells[0].textContent = document.getElementById("editarFecha").value;
    cassetteSeleccionado.cells[2].textContent = document.getElementById("editarOrgano").value;
    cassetteSeleccionado.setAttribute("data-caracteristicas", document.getElementById("editarCaracteristicas").value);
    cassetteSeleccionado.setAttribute("data-observaciones", document.getElementById("editarObservaciones").value);

    mostrarDetallesCassette(cassetteSeleccionado);
    cerrarModalEditar();
};

// Event Listeners
editarCassetteBtn.addEventListener("click", abrirModalEditar);
cerrarEditarModalBtn.addEventListener("click", cerrarModalEditar);
formEditarCassette.addEventListener("submit", guardarEdicionCassette);
