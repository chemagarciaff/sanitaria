/*
    Funcionalidades de detalle de cassette
    Mostrar la información del cassette seleccionado
*/

//? GET http://localhost:3000/sanitaria/cassettes/{id}

// Función para obtener los detalles de un cassette
const obtenerDetallesCassette = async (id, fila) => {
    try {
        const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${id}`);
        if (!response.ok) throw new Error("Error al obtener detalles del cassette.");
        
        const cassette = await response.json();
        cassetteSeleccionado = cassette; 

        // Actualizar la UI con los detalles
        detalleDescripcion.textContent = cassette.descripcion_cassette;
        detalleFecha.textContent = cassette.fecha_cassette;
        detalleOrgano.textContent = cassette.organo_cassette;
        detalleCaracteristicas.textContent = cassette.caracteristicas_cassette || "Sin características";
        detalleObservaciones.textContent = cassette.observaciones_cassette || "Sin observaciones";

        // Resaltar la fila seleccionada
        document.querySelectorAll("#cassetteTableBody tr").forEach(row => row.classList.remove("bg-teal-100"));
        fila.classList.add("bg-teal-100");

    } catch (error) {
        console.error("Error al obtener detalles:", error);
    }
};


// Función para agregar el evento de clic en el icono de cada fila
const agregarEventosDetalle = () => {
    document.querySelectorAll(".detalle-cassette").forEach(icono => {
        icono.addEventListener("click", (event) => {
            // Obtener el ID del cassette
            const idCassette = icono.getAttribute("data-id");
            // Obtener la fila del cassette
            const filaSeleccionada = icono.closest("tr");
            obtenerDetallesCassette(idCassette, filaSeleccionada);
        });
    });
};

// Asegurar que los eventos de detalle se cargan al inicio
document.addEventListener("DOMContentLoaded", agregarEventosDetalle);
