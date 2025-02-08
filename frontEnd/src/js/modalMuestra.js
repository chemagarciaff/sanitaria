// Elementos del DOM
const modalMuestra = document.getElementById("modalMuestra");
const modalMuestraContent = document.getElementById("modalMuestraContent");
const openModalMuestraBtn = document.getElementById("openModalMuestraBtn");
const closeModalMuestraBtn = document.getElementById("closeModalMuestra");
const muestraForm = document.getElementById("muestraForm");
const errorMuestra = document.getElementById("errorMuestra");

// Función para abrir el modal
const abrirModalMuestra = () => {
    modalOverlay.classList.remove("hidden");
    modalMuestra.classList.remove("hidden");
    setTimeout(() => {
        modalMuestraContent.classList.remove("scale-95");
    }, 10);
};

// Función para cerrar el modal
const cerrarModalMuestra = () => {
    modalMuestraContent.classList.add("scale-95");
    setTimeout(() => {
        modalOverlay.classList.add("hidden");
        modalMuestra.classList.add("hidden");
        errorMuestra.textContent = "";
    }, 300);
};

// Event Listeners
openModalMuestraBtn.addEventListener("click", abrirModalMuestra);
closeModalMuestraBtn.addEventListener("click", cerrarModalMuestra);
