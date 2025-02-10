/*
    Funciones para la Gestión de Muestras
*/

// Almacenamiento temporal de muestras en memoria
let muestrasPorCassette = {};

/* ################################################
   ###   Función para actualizar la lista de muestras  ###
   ################################################ */

// Función que renderiza las muestras asociadas al cassette seleccionado
const actualizarListaMuestras = () => {
    // Verificar si hay un cassette seleccionado
    if (!cassetteSeleccionado || !cassetteSeleccionado.dataset.id) {
        console.warn("⚠️ No hay un cassette seleccionado o falta el ID.");
        return;
    }

    const idCassette = cassetteSeleccionado.dataset.id;

    // Limpiar el contenido previo
    muestraTableBody.innerHTML = "";

    const muestras = muestrasPorCassette[idCassette] || [];

    muestras.forEach((muestra, index) => {
        const newRow = document.createElement("tr");
        newRow.classList.add("border-b");

        newRow.innerHTML = `
            <td class="p-2">${muestra.fecha}</td>
            <td class="p-2">${muestra.descripcion}</td>
            <td class="p-2">${muestra.tincion}</td>
            <td class="p-2">
                <div class="relative w-8 h-8 text-teal-500 detalle-muestra cursor-pointer" data-id="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-teal-600 icono hover:text-teal-400 active:text-teal-700" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"></path>
                    </svg>
                </div>
            </td>
        `;

        muestraTableBody.appendChild(newRow);
    });

    // Asegurar que los eventos se agregan a los detalles de muestra
    agregarEventosDetalleMuestra();
};


document.addEventListener("cassetteSeleccionado", actualizarListaMuestras);


/* ##################################################
   ###   Función para agregar muestra al cassette  ###
   ################################################## */

// Función para manejar la creación de una nueva muestra
const agregarMuestra = (event) => {
    event.preventDefault();

    if (!cassetteSeleccionado) {
        errorCrearMuestra.textContent = "Selecciona un cassette antes de añadir una muestra.";
        return;
    }

    const descripcion = document.getElementById("descripcionMuestra").value.trim();
    const fecha = document.getElementById("fechaMuestra").value.trim();
    const tincion = document.getElementById("tincionMuestra").value.trim();
    const observaciones = document.getElementById("observacionesMuestra").value.trim();
    const imagen = document.getElementById("imagenMuestra").files[0];

    if (!descripcion || !fecha || !tincion) {
        errorMuestra.textContent = "Rellena los campos obligatorios";
        return;
    }

    const idCassette = cassetteSeleccionado.dataset.id;

    if (!muestrasPorCassette[idCassette]) {
        muestrasPorCassette[idCassette] = [];
    }

    const nuevaMuestra = {
        descripcion,
        fecha,
        tincion,
        observaciones,
        imagen: imagen ? URL.createObjectURL(imagen) : null, // Almacena la referencia de la imagen
    };

    // Agregar muestra a la estructura de datos
    muestrasPorCassette[idCassette].push(nuevaMuestra);

    // Llamar a la función para actualizar la tabla de muestras inmediatamente
    actualizarListaMuestras();

    // Cerrar el modal de creación
    cerrarModalMuestra();

    // Resetear el formulario
    muestraForm.reset();
};


/* ##################################################
   ###   Función para manejar los detalles de la muestra  ###
   ################################################## */

// Función para agregar eventos a los botones de detalle de muestra
const agregarEventosDetalleMuestra = () => {
    document.querySelectorAll(".detalle-muestra").forEach((boton) => {
        boton.addEventListener("click", (event) => {
            const idCassette = cassetteSeleccionado.dataset.id;
            const muestraIndex = event.currentTarget.dataset.id;
            const muestra = muestrasPorCassette[idCassette][muestraIndex];

            mostrarDetallesMuestra(muestra);
        });
    });
};

/* #################################################
   ###   Event Listeners y Asignación de eventos  ###
   ################################################# */

// Event Listener para agregar muestra
muestraForm.addEventListener("submit", agregarMuestra);

// Event Listener para cambiar de cassette y actualizar las muestras
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("cassetteSeleccionado", () => {
        setTimeout(actualizarListaMuestras, 100);
    });
});

document.addEventListener("cassetteSeleccionado", actualizarListaMuestras);
