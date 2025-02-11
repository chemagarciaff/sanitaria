/*
    Funcionalidades de detalle de cassette
    Mostrar la información del cassette seleccionado
*/

//? GET http://localhost:3000/sanitaria/cassettes/{id}

// Función para obtener los detalles de un cassette
const obtenerDetallesCassette = async (idCassette, filaSeleccionada) => {
    try {
        const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${idCassette}`);

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }

        const cassette = await response.json();

        // Mostrar la información en el panel de "Detalle Cassette"
        detalleDescripcion.textContent = cassette.descripcion_cassette || "Sin descripción";
        detalleFecha.textContent = cassette.fecha_cassette || "Sin fecha";
        detalleOrgano.textContent = cassette.organo_cassette || "Sin órgano";
        detalleCaracteristicas.textContent = cassette.caracteristicas_cassette || "Sin características";
        detalleObservaciones.textContent = cassette.observaciones_cassette || "Sin observaciones";

        // Guardar el cassette seleccionado globalmente
        cassetteSeleccionado = cassette;

        // Resaltar el cassette seleccionado
        document.querySelectorAll("#cassetteTableBody tr").forEach(row => row.classList.remove("bg-teal-100"));
        filaSeleccionada.classList.add("bg-teal-100");

        // Habilitar botones de editar y eliminar
        editarCassetteBtn.classList.remove("opacity-50", "cursor-not-allowed");
        eliminarCassetteBtn.classList.remove("opacity-50", "cursor-not-allowed");

        // Enlazar los botones de edición y eliminación al cassette seleccionado
        editarCassetteBtn.onclick = () => abrirModalEditar(idCassette);
        eliminarCassetteBtn.onclick = () => abrirModalEliminar(idCassette);
    } catch (error) {
        console.error("Error al obtener detalles del cassette:", error);
    }
};

// Función para agregar el evento de clic en el icono de cada fila
const agregarEventosDetalle = () => {
    document.querySelectorAll(".detalle-cassette").forEach(icono => {
        icono.addEventListener("click", (event) => {
            const idCassette = icono.getAttribute("data-id"); // Obtener el ID del cassette
            const filaSeleccionada = icono.closest("tr"); // Obtener la fila del cassette
            obtenerDetallesCassette(idCassette, filaSeleccionada);
        });
    });
};

// Asegurar que los eventos de detalle se cargan al inicio
document.addEventListener("DOMContentLoaded", agregarEventosDetalle);
