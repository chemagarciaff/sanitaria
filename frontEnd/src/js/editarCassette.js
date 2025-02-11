/*
    Funcionalidad para editar cassettes
    Abrir modal con la info del cassette seleccionado, cerrar modal y guardar cambios en la API
*/

// Evitar la doble declaración de variables globales
if (!window.modalOverlay) {
    window.modalOverlay = document.getElementById("modal-overlay");
}
if (!window.modalEditar) {
    window.modalEditar = document.getElementById("modalEditarCassette");
}
if (!window.editarCassetteBtn) {
    window.editarCassetteBtn = document.getElementById("btnEditarCassette");
}
if (!window.cassetteSeleccionado) {
    window.cassetteSeleccionado = null;
}

const formEditarCassette = document.getElementById("formEditarCassette");

// Función para abrir el modal de edición con los datos actuales del cassette seleccionado
const abrirModalEditar = () => {
    if (!window.cassetteSeleccionado || !window.cassetteSeleccionado.id_cassette) {
        console.error("No hay cassette seleccionado para editar.");
        return;
    }

    console.log("Abriendo modal de edición para:", window.cassetteSeleccionado.id_cassette);

    // Rellenar los campos del modal con los datos del cassette seleccionado
    document.getElementById("editarDescripcion").value = window.cassetteSeleccionado.descripcion_cassette || "";
    document.getElementById("editarFecha").value = window.cassetteSeleccionado.fecha_cassette || "";
    document.getElementById("editarOrgano").value = window.cassetteSeleccionado.organo_cassette || "";
    document.getElementById("editarCaracteristicas").value = window.cassetteSeleccionado.caracteristicas_cassette || "Sin características";
    document.getElementById("editarObservaciones").value = window.cassetteSeleccionado.observaciones_cassette || "Sin observaciones";

    // Mostrar el modal
    window.modalEditar.classList.remove("hidden");
    window.modalOverlay.classList.remove("hidden");
};

// Asegurar que el botón de edición funciona
document.getElementById("btnEditarCassette").addEventListener("click", abrirModalEditar);


// Función para cerrar el modal de edición
const cerrarModalEditar = () => {
    window.modalEditar.classList.add("hidden");
    window.modalOverlay.classList.add("hidden");
    //! ELIMINAR
    document.getElementById("modalEditarCassette").classList.add("hidden");
    document.getElementById("modalOverlay").classList.add("hidden");
};

// Función para guardar los cambios del cassette editado en la API
const guardarEdicionCassette = async (event) => {
    event.preventDefault();

    if (!window.cassetteSeleccionado || !window.cassetteSeleccionado.id_cassette) {
        console.error("No hay un cassette válido seleccionado para editar.");
        return;
    }

    console.log("Editando cassette con ID:", window.cassetteSeleccionado.id_cassette);

    const idCassette = window.cassetteSeleccionado.id_cassette;

    const descripcion = document.getElementById("editarDescripcion").value.trim();
    const fecha = document.getElementById("editarFecha").value.trim();
    const organo = document.getElementById("editarOrgano").value.trim();
    const caracteristicas = document.getElementById("editarCaracteristicas").value.trim() || "Sin características";
    const observaciones = document.getElementById("editarObservaciones").value.trim() || "Sin observaciones";

    if (!descripcion || !fecha || !organo) {
        console.error("Faltan datos obligatorios.");
        return;
    }

    const cassetteActualizado = {
        fecha_cassette: fecha,
        descripcion_cassette: descripcion,
        organo_cassette: organo,
        caracteristicas_cassette: caracteristicas,
        observaciones_cassette: observaciones,
    };

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${idCassette}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cassetteActualizado),
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }

        console.log("Cassette actualizado correctamente.");

        // Cerrar el modal después de actualizar
        cerrarModalEdicion();

        // Recargar la lista de cassettes para reflejar el cambio
        await loadCassettes();

    } catch (error) {
        console.error("Error al actualizar el cassette:", error);
    }
};

// Asignar evento al botón de guardar
document.getElementById("formEditarCassette").addEventListener("submit", guardarEdicionCassette);

// Asegurar que al hacer click en cerrar el modal, también se oculta el overlay
document.getElementById("cerrarEditarModal").addEventListener("click", cerrarModalEdicion);

// Función para actualizar visualmente la fila del cassette editado
const actualizarFilaCassette = (idCassette, cassetteEditado) => {
    const filas = document.querySelectorAll("#cassetteTableBody tr");
    filas.forEach(fila => {
        if (fila.dataset.id === idCassette) {
            fila.cells[0].textContent = cassetteEditado.fecha_cassette;
            fila.cells[1].textContent = cassetteEditado.descripcion_cassette;
            fila.cells[2].textContent = cassetteEditado.organo_cassette;

            // Actualizar los atributos dataset para futuras ediciones
            fila.dataset.fecha = cassetteEditado.fecha_cassette;
            fila.dataset.descripcion = cassetteEditado.descripcion_cassette;
            fila.dataset.organo = cassetteEditado.organo_cassette;
            fila.dataset.caracteristicas = cassetteEditado.caracteristicas_cassette;
            fila.dataset.observaciones = cassetteEditado.observaciones_cassette;
        }
    });
};

// Asignar eventos a los botones del modal de edición
document.getElementById("cerrarEditarModal").addEventListener("click", cerrarModalEditar);
formEditarCassette.addEventListener("submit", guardarEdicionCassette);

// Asignar evento al botón de edición
editarCassetteBtn.addEventListener("click", abrirModalEditar);

/* ###############################################
   ###   Restricción de fecha en edición     ###
   #############################################*/

// Seleccionar el input de fecha en el formulario de edición
const fechaInputEditar = document.getElementById("editarFecha");

// Función para establecer la fecha mínima como la actual
const restringirFechaMinimaEdicion = () => {
    const hoy = new Date().toISOString().split("T")[0];
    fechaInputEditar.setAttribute("min", hoy);
};

// Aplicar la restricción al cargar el modal de edición
document.addEventListener("DOMContentLoaded", restringirFechaMinimaEdicion);
