// Elementos del DOM
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalOverlay = document.getElementById("modal-overlay");

const descripcionInput = document.getElementById("descripcionInput");
const fechaInput = document.getElementById("fechaInput");
const organoInput = document.getElementById("organoInput");
const caracteristicasInput = document.getElementById("caracteristicasInput");
const observacionesInput = document.getElementById("observacionesInput");
const cassetteForm = document.getElementById("cassetteForm");
const cassetteTableBody = document.getElementById("cassetteTableBody");
const errorMessage = document.getElementById("error-message");

// Función para abrir el modal
const abrirModal = () => {
    modalOverlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    setTimeout(() => {
        modalContent.classList.remove("scale-95", "opacity-0");
    }, 10);
};

// Función para cerrar el modal
const cerrarModal = () => {
    modalContent.classList.add("scale-95");
    setTimeout(() => {
        modalOverlay.classList.add("hidden");
        modal.classList.add("hidden");
        errorMessage.textContent = "";
    }, 300);
};

const enviarFormulario = (event) => {
    event.preventDefault();

    const descripcion = descripcionInput.value.trim();
    const fecha = fechaInput.value.trim();
    const organo = organoInput.value.trim();

    if (!descripcion || !fecha || !organo) {
        errorMessage.textContent = "Rellena los campos obligatorios";
        return;
    }

    const newRow = document.createElement("tr");
    newRow.classList.add("border-b");

    const caracteristicas = caracteristicasInput.value.trim() || "Información no disponible";
    const observaciones = observacionesInput.value.trim() || "Sin observaciones";

    newRow.setAttribute("data-caracteristicas", caracteristicas);
    newRow.setAttribute("data-observaciones", observaciones);

    newRow.innerHTML = `
        <td class="p-2">${fecha}</td>
        <td class="p-2">${descripcion}</td>
        <td class="p-2">${organo}</td>
        <td class="p-2">
            <div class="relative w-8 h-8 text-teal-500 detalle-cassette cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-teal-600 icono hover:text-teal-400 active:text-teal-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"></path>
                </svg>
            </div>
        </td>
    `;

    cassetteTableBody.appendChild(newRow);
    cerrarModal();
    cassetteForm.reset();
    agregarEventosDetalle();
};


// Event Listeners
openModalBtn.addEventListener("click", abrirModal);
closeModalBtn.addEventListener("click", cerrarModal);
cassetteForm.addEventListener("submit", enviarFormulario);
