/*
    Funciones para la Gestión de Muestras
    Listar muestras de cada cassette, añadir nuevas muestras y botón detalles muestra
*/

//!     ESTE FICHERO JS ACTUALMENTE NO SE USA

// Almacenamiento temporal de muestras por cassette
let muestrasPorCassette = {};

/* ################################################
   ###   Función para actualizar la lista de muestras  ###
   ################################################ */

// Renderizar las muestras asociadas al cassette seleccionado
const actualizarListaMuestras = () => {
    if (!cassetteSeleccionado || !cassetteSeleccionado.dataset.id) {
        console.warn(" No hay un cassette seleccionado o falta el ID.");
        return;
    }

    const idCassette = cassetteSeleccionado.dataset.id;
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

    // Asignar eventos a los botones de detalle
    agregarEventosDetalleMuestra();
};

// Escuchar evento para agregar muestra
document.addEventListener("muestraCreada", (event) => {
    const idCassette = cassetteSeleccionado.dataset.id;

    if (!muestrasPorCassette[idCassette]) {
        muestrasPorCassette[idCassette] = [];
    }

    // Agregar la nueva muestra
    muestrasPorCassette[idCassette].push(event.detail);

    // Actualizar la lista de muestras en la UI
    actualizarListaMuestras();
});

/* ##################################################
   ###   Función para manejar los detalles de la muestra  ###
   ################################################## */

// Función para mostrar detalles de la muestra seleccionada
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

// Event Listener para cambiar de cassette y actualizar las muestras
document.addEventListener("cassetteSeleccionado", () => {
    setTimeout(actualizarListaMuestras, 100);
});
