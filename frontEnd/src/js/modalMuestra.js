/* 
    Funciones del Modal Añadir Muestras
*/

// Función para abrir el modal de muestras
const abrirModalMuestra = () => {
    if (!cassetteSeleccionado) {
        errorCrearMuestra.textContent = "Debes seleccionar un cassette antes de añadir una muestra.";
        return;
    }

    errorCrearMuestra.textContent = "";
    errorMuestra.textContent = "";

    modalOverlay.classList.remove("hidden");
    modalMuestra.classList.remove("hidden");

    setTimeout(() => {
        modalMuestraContent.classList.remove("scale-95");
    }, 10);
};

// Función para cerrar el modal de muestras
const cerrarModalMuestra = () => {
    modalMuestraContent.classList.add("scale-95");
    setTimeout(() => {
        modalOverlay.classList.add("hidden");
        modalMuestra.classList.add("hidden");
        errorMuestra.textContent = "";
    }, 300);
};

// Event listeners para abrir/cerrar modal
openModalMuestraBtn.addEventListener("click", abrirModalMuestra);
closeModalMuestraBtn.addEventListener("click", cerrarModalMuestra);

/*
    Función para validar formulario y enviar evento de creación
*/
const validarYEnviarMuestra = (event) => {
    event.preventDefault();

    const descripcion = document.getElementById("descripcionMuestra").value.trim();
    const fecha = document.getElementById("fechaMuestra").value.trim();
    const tincion = document.getElementById("tincionMuestra").value.trim();
    const observaciones = document.getElementById("observacionesMuestra").value.trim();
    const imagen = document.getElementById("imagenMuestra").files[0];

    // Validar que todos los campos obligatorios están llenos
    if (!descripcion || !fecha || !tincion || !observaciones) {
        errorMuestra.textContent = "Rellena los campos obligatorios";
        return;
    }

    //! Disparar evento para que muestras.js gestione la creación
    document.dispatchEvent(new CustomEvent("muestraCreada", {
        detail: {
            descripcion,
            fecha,
            tincion,
            observaciones,
            imagen: imagen ? URL.createObjectURL(imagen) : null,
        }
    }));

    // Cerrar el modal y limpiar el formulario
    cerrarModalMuestra();
    muestraForm.reset();
};

// Event listener para validar y enviar formulario
muestraForm.addEventListener("submit", validarYEnviarMuestra);

// Limitar fecha input
document.addEventListener("DOMContentLoaded", () => {
    const fechaMuestraInput = document.getElementById("fechaMuestra");
    fechaMuestraInput.setAttribute("min", new Date().toISOString().split("T")[0]);
});

