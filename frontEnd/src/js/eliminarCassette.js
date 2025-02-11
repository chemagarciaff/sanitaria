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
    if (!cassetteSeleccionado || !cassetteSeleccionado.dataset.id) {
        console.error("No se encontró un cassette válido para eliminar.");
        return;
    }

    const cassetteId = cassetteSeleccionado.dataset.id;

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${cassetteSeleccionado.id_cassette}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error en la API al eliminar el cassette.`);
        }

        // Eliminar visualmente la fila del cassette de la tabla
        cassetteSeleccionado.remove();
        cassetteSeleccionado = null;

        // Limpiar los detalles del cassette
        detalleDescripcion.textContent = "";
        detalleFecha.textContent = "";
        detalleOrgano.textContent = "";
        detalleCaracteristicas.textContent = "";
        detalleObservaciones.textContent = "";
        cassetteSeleccionado = null;

        // Cerrar Modal
        cerrarModalEliminar();

        // Mostrar en caso de error o de funcionamiento 
        console.log("Cassette eliminado correctamente.");
    } catch (error) {
        console.error("Error al eliminar el cassette:", error);
    }
};

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
