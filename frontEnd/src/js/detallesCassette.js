const agregarEventosDetalle = () => {
    document.querySelectorAll("#cassetteTableBody tr").forEach(fila => {
        const botonDetalle = fila.querySelector(".detalle-cassette");
        if (botonDetalle) {
            botonDetalle.addEventListener("click", () => mostrarDetallesCassette(fila));
        }
    });
};


const mostrarDetallesCassette = (fila) => {
    cassetteSeleccionado = fila;

    // Obtener los valores de la fila seleccionada y actualizar los detalles
    detalleDescripcion.textContent = fila.cells[1].textContent.trim() || "Sin descripción";
    detalleFecha.textContent = fila.cells[0].textContent.trim() || "Sin fecha";
    detalleOrgano.textContent = fila.cells[2].textContent.trim() || "Sin órgano";
    detalleCaracteristicas.textContent = fila.getAttribute("data-caracteristicas")?.trim() || "Información no disponible";
    detalleObservaciones.textContent = fila.getAttribute("data-observaciones")?.trim() || "Sin observaciones";

    // Asegurar que los elementos sean visibles
    detalleDescripcion.style.display = "block";
    detalleFecha.style.display = "block";
    detalleOrgano.style.display = "block";
    detalleCaracteristicas.style.display = "block";
    detalleObservaciones.style.display = "block";

    // Marcar visualmente la fila seleccionada
    document.querySelectorAll("#cassetteTableBody tr").forEach(row => row.classList.remove("bg-teal-100"));
    fila.classList.add("bg-teal-100");
};


