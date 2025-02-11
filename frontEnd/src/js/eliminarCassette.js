/*
    Funcionalidad para eliminar cassettes desde la API
    Abre y cierra el modal, elimina el cassette seleccionado
*/

// Función para abrir el modal de eliminación
const abrirModalEliminar = () => {
    if (!cassetteSeleccionado || !cassetteSeleccionado.id_cassette) {
        console.error("No hay cassette seleccionado para eliminar.");
        return;
    }

    modalEliminar.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
};


// Función para cerrar el modal de eliminación
const cerrarModalEliminar = () => {
    modalEliminar.classList.add("hidden");
    modalOverlay.classList.add("hidden");
};

// Función para eliminar el cassette seleccionado de la API y de la tabla
const eliminarCassette = async () => {
    if (!cassetteSeleccionado || !cassetteSeleccionado.id_cassette) {
        console.error("Error: No hay cassette seleccionado para eliminar.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${cassetteSeleccionado.id_cassette}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Error al eliminar el cassette.");

        console.log("Cassette eliminado correctamente.");

        // Resetear la selección
        cassetteSeleccionado = null;

        // Limpiar detalles del cassette eliminado
        detalleDescripcion.textContent = "";
        detalleFecha.textContent = "";
        detalleOrgano.textContent = "";
        detalleCaracteristicas.textContent = "";
        detalleObservaciones.textContent = "";

        // Cerrar el modal de eliminación
        cerrarModalEliminar();

        // Recargar la lista de cassettes para actualizar la tabla
        loadCassettes();

    } catch (error) {
        console.error("Error al eliminar el cassette:", error);
    }
};

// Asegurar que el botón está enlazado correctamente
document.getElementById("confirmarEliminar").addEventListener("click", eliminarCassette);

// Verificar que el cassette tiene un ID antes de seleccionarlo
const seleccionarCassette = (fila) => {
    if (!fila || !fila.dataset.id) {
        console.error("La fila seleccionada no tiene un ID válido.");
        return;
    }
    cassetteSeleccionado = fila;
};

// Asignar eventos a los botones del modal de eliminación
document.getElementById("confirmarEliminar").addEventListener("click", eliminarCassette);
document.getElementById("cancelarEliminar").addEventListener("click", cerrarModalEliminar);
document.getElementById("cerrarEliminarModal").addEventListener("click", cerrarModalEliminar);
eliminarCassetteBtn.addEventListener("click", abrirModalEliminar);

