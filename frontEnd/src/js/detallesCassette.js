/*
    Funcionalidades de detalle de cassette
    Mostrar la información del cassette seleccionado y eventos de editar o borrar
*/

// Función para actualizar el detalle del cassette seleccionado
const mostrarDetallesCassette = (fila) => {
    if (!fila) return;

    // Guardar el cassette seleccionado globalmente
    cassetteSeleccionado = fila;

    // Actualizar la sección de detalles
    detalleDescripcion.textContent = fila.cells[1].textContent;
    detalleFecha.textContent = fila.cells[0].textContent;
    detalleOrgano.textContent = fila.cells[2].textContent;
    detalleCaracteristicas.textContent = fila.getAttribute("data-caracteristicas") || "Información no disponible";
    detalleObservaciones.textContent = fila.getAttribute("data-observaciones") || "Sin observaciones";

    // Resaltar la fila seleccionada en color teal
    document.querySelectorAll("#cassetteTableBody tr").forEach(row => row.classList.remove("bg-teal-100"));
    fila.classList.add("bg-teal-100");

    // Habilitar botones de editar y eliminar
    editarCassetteBtn.classList.remove("opacity-50", "cursor-not-allowed");
    eliminarCassetteBtn.classList.remove("opacity-50", "cursor-not-allowed");

    // Enlazar los botones de edición y eliminación al cassette seleccionado
    editarCassetteBtn.onclick = () => abrirModalEditar();
    eliminarCassetteBtn.onclick = () => abrirModalEliminar();
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

// Asegurar que los eventos de detalle se cargan al inicio
document.addEventListener("DOMContentLoaded", agregarEventosDetalle);
