/*
    Funciones del Modal Añadir Muestras
*/

// Función para abrir el modal de añadir muestras
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

// Event listeners
openModalMuestraBtn.addEventListener("click", abrirModalMuestra);
closeModalMuestraBtn.addEventListener("click", cerrarModalMuestra);

/*
    Funciones para añadir muestras
*/

// Función para validar y enviar el formulario de la muestra
const enviarFormularioMuestra = (event) => {
    event.preventDefault();

    const descripcion = document.getElementById("descripcionMuestra").value.trim();
    const fecha = document.getElementById("fechaMuestra").value.trim();
    const tincion = document.getElementById("tincionMuestra").value.trim();
    const imagen = document.getElementById("imagenMuestra").files[0];

    if (!descripcion || !fecha || !tincion) {
        errorMuestra.textContent = "Rellena los campos obligatorios";
        return;
    }

    if (imagen) {
        console.log("Imagen seleccionada:", imagen.name);
    }

    cerrarModalMuestra();
    muestraForm.reset();
};

// Event listener para envío del formulario de muestras
muestraForm.addEventListener("submit", enviarFormularioMuestra);


// Limitar fecha input

const fechaMuestraInput = document.getElementById("fechaMuestra");

// Función para establecer la fecha mínima como la actual
const restringirFechaMinimaMuestra = () => {
    const hoy = new Date().toISOString().split("T")[0];
    fechaMuestraInput.setAttribute("min", hoy);
};

// Aplicar la restricción al cargar la página
document.addEventListener("DOMContentLoaded", restringirFechaMinimaMuestra);
