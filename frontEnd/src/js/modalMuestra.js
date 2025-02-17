//VARIABLES
let containerMuestra = document.getElementById('muestraTableBody');
const descripcion = document.getElementById("descripcionMuestra");
const fecha = document.getElementById("fechaMuestra");
const tincion = document.getElementById("editarTincionMuestra");
const observaciones = document.getElementById("observacionesMuestra");
const imagen = document.getElementById("imagenMuestra").files[0];

const btnEditarMuestra = document.getElementById("btnEditarMuestra");
const btnEliminarMuestra = document.getElementById("btnEliminarMuestra");

const modalOverlayEditarMuestra = document.getElementById("modalOverlayEditarMuestra");

const modalEditarMuestra = document.getElementById("modalEditarMuestra");
const cerrarEditarMuestra = document.getElementById("cerrarEditarMuestra");
const modalDetalleMuestra = document.getElementById("modalDetalleMuestra");

const modalEliminarMuestra = document.getElementById("modalEliminarMuestra"); 
const cerrarEliminarMuestra = document.getElementById("cerrarEliminarMuestra");
const cancelarEliminarMuestra = document.getElementById("cancelarEliminarMuestra");

let idCassetteGlobal = null;


/* 
    Funciones del Modal Añadir Muestras
    Abrir, cerrar modal y validar form del modal

*/

// Eliminar la fila seleccionada
let filaCassetteSeleccionado = null;

// Función para obtener el id del cassette seleccioando
const showMuestrasAndDetalles = async (event) => {
    let idCassette = returnIdOfCassette(event);
    idCassetteGlobal = idCassette;

    if (idCassette) {
        // Quitar selección anterior
        if (filaCassetteSeleccionado) {
            filaCassetteSeleccionado.classList.remove("bg-teal-100", "font-semibold");
        }

        // Guardar la fila seleccionada
        filaCassetteSeleccionado = event.target.closest("tr");
        if (filaCassetteSeleccionado) {
            filaCassetteSeleccionado.classList.add("bg-teal-100", "font-semibold");
        }

        // Cargar los detalles y muestras del cassette seleccionado
        await loadMuestras(idCassette);
        await loadOneCassette(idCassette);
    }
};


//Cargar las muestras que pertenecen al cassette
const loadMuestras = async (idCassette) =>{
    const response = await fetch(`http://localhost:3000/sanitaria/muestras/cassette/${idCassette}`)
    const data = await response.json();
    createMuestras(data);
    muestrasFromCassette = data;
}

//Crear muestras
const createMuestras = (muestras) =>{
    //Dejamos el contenedor a blanco
    containerMuestra.innerHTML = "";
    //Creamos el framgent 
    let fragment = document.createDocumentFragment();
    //Recorremos el array de objetos
    muestras.forEach((muestra) => {

        //Crear fila
        let fila = document.createElement('tr');
        fila.classList.add("border-b", "hover:bg-gray-100");

        //Columna fecha
        let fecha = document.createElement('td');

        //Objeto Date
        const fechaDate = new Date(muestra.fecha_muestra);
        const fechaFormateada = fechaDate.toISOString().split('T')[0];
        fecha.textContent = fechaFormateada;
        fecha.classList.add("p-2", "text-gray-700", "text-left");
        fila.appendChild(fecha);

        //Columna descripcion
        let descripcion = document.createElement('td');
        descripcion.textContent = muestra.descripcion_muestra;
        descripcion.classList.add("p-2", "text-gray-700", "text-left");
        fila.appendChild(descripcion);

        //Columna tincion
        let tincion = document.createElement('td');
        tincion.textContent = muestra.tincion_muestra;
        tincion.classList.add("p-2", "text-gray-700", "text-left");
        fila.appendChild(tincion);

        //Columna icono
        let columIcono = document.createElement('td');
        columIcono.classList.add("p-2", "text-center");

        // Icono del cassette
        let icono = document.createElement('i');
        icono.classList.add("p-none", "mt-4", "icono", "fa-solid", "fa-file", "relative", "w-8", "h-8", "text-teal-500", "detalle-cassette", "cursor-pointer", "hover:text-teal-400", "active:text-teal-700");
        icono.setAttribute("data-id", muestra.id_muestra);

        icono.addEventListener("click", () => abrirModalDetalleMuestra(muestra)); 
        columIcono.appendChild(icono);
        fila.appendChild(columIcono);

        //Añadimos la fila al fragment
        fragment.appendChild(fila);
    });

    containerMuestra.appendChild(fragment)
}

//Cargar los cassetes
const loadOneCassette = async (idCassette) =>{
    const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${idCassette}`)
    const data = await response.json();
    createDetailOfCassette(data);
}

//Crear los datos de los detalles
const createDetailOfCassette = (cassette) =>{
    //Dejar el contenido vacio 
    detalleDescripcion.textContent = "";
    detalleOrgano.textContent = "";
    detalleFecha.textContent = "";
    detalleObservaciones.textContent = "";
    detalleCaracteristicas.textContent = "";
    //Añadimos los datos del objeto
    detalleDescripcion.textContent = cassette.descripcion_cassette;
    detalleCaracteristicas.textContent = cassette.caracteristicas_cassette;
    detalleFecha.textContent = cassette.fecha_cassette;
    detalleObservaciones.textContent = cassette.observaciones_cassette;
    detalleOrgano.textContent = cassette.organo_cassette;
}

// Función para abrir el modal de muestras
const abrirModalMuestra = (event) => {
    if (!idCassetteGlobal) {
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

//Hacer POST a la API con los datos del modal muestra
const postMuestra = async (event) =>{
    event.preventDefault();
    //Creamos el objeto muestra
    const muestra = {
        fecha_muestra: fecha.value.trim(),
        observaciones_muestra: observaciones.value.trim(),
        descripcion_muestra: descripcion.value.trim(),
        tincion_muestra: tincion.value,
        qr_muestra: 'QR004M',
        cassetteIdCassette: idCassetteGlobal
    }
    //Hacemos el post de los datos que nos pasa el usuario
    const response = await fetch('http://localhost:3000/sanitaria/muestras/', {
        method:'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body:JSON.stringify(muestra)
    })
    //Comprobamos si se ha subido correctamente
    if (response.ok) {
        const data = await response.json();
         //Cerramos el modal
        cerrarModalMuestra();
        //LLamamos a la funcion que saca las muestras para msotrar la muestra creada
        loadMuestras(idCassetteGlobal)
    }
}
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

// Limitar fecha input
document.addEventListener("DOMContentLoaded", () => {
    const fechaMuestraInput = document.getElementById("fechaMuestra");
    fechaMuestraInput.setAttribute("min", new Date().toISOString().split("T")[0]);
});

// Función para abrir el modal de detalles de muestra
const abrirModalDetalleMuestra = (muestra) => {
    // Asignar los valores al modal de detalle muestra
    detalleDescripcionMuestra.textContent = muestra.descripcion_muestra;
    detalleFechaMuestra.textContent = new Date(muestra.fecha_muestra).toISOString().split('T')[0];
    detalleTincionMuestra.textContent = muestra.tincion_muestra;
    detalleObservacionesMuestra.textContent = muestra.observaciones_muestra;
    imagenPrincipalMuestra.src = muestra.imagen_muestra ? muestra.imagen_muestra : "ruta/default-image.jpg"; // Imagen por defecto si no tiene

    // Mostrar el modal
    modalOverlay.classList.remove("hidden");
    modalDetalleMuestra.classList.remove("hidden");
};

// Función para cerrar el modal de muestras
const cerrarModalDetalleMuestra = () => {
    modalMuestraContent.classList.add("scale-95");
    setTimeout(() => {
        modalOverlay.classList.add("hidden");
        modalDetalleMuestra.classList.add("hidden");
        modalEditarMuestra.classList.add("hidden");
        modalEliminarMuestra.classList.add("hidden");
        errorDetalleMuestra.textContent = "";
    }, 300);
};


// Función para abrir el modal de editar muestras
const abrirModalEditarMuestra = () => {
    // Obtener los valores actuales del modal de detalles
    document.getElementById("editarDescripcionMuestra").value = detalleDescripcionMuestra.textContent;
    document.getElementById("editarFechaMuestra").value = detalleFechaMuestra.textContent;
    document.getElementById("editarTincionMuestra").value = detalleTincionMuestra.textContent;
    document.getElementById("editarObservacionesMuestra").value = detalleObservacionesMuestra.textContent;

    // Mostrar el modal de edición
    modalOverlayEditarMuestra.classList.remove("hidden");
    modalEditarMuestra.classList.remove("hidden");
};

// Función para cerrar el modal de muestras
const cerrarModalEditarMuestra = () => {
    setTimeout(() => {
        modalOverlayEditarMuestra.classList.add("hidden");
        modalEditarMuestra.classList.add("hidden");
        errorEditarMuestra.textContent = "";
    }, 300);
};

// Función para abrir el modal de eliminar muestras
const abrirModalEliminarMuestra = () => {
    modalOverlayEditarMuestra.classList.remove("hidden");
    modalEliminarMuestra.classList.remove("hidden"); 
};

// Función para cerrar el modal de eliminar muestras
const cerrarModalEliminarMuestra = () => {
    setTimeout(() => {
        modalOverlayEditarMuestra.classList.add("hidden"); 
        modalEliminarMuestra.classList.add("hidden");
    }, 300);
};


cerrarDetalleMuestra.addEventListener("click", cerrarModalDetalleMuestra);
btnEditarMuestra.addEventListener("click", abrirModalEditarMuestra);
cerrarEditarMuestra.addEventListener("click", cerrarModalEditarMuestra);

btnEliminarMuestra.addEventListener("click", abrirModalEliminarMuestra);
cerrarEliminarMuestra.addEventListener("click", cerrarModalEliminarMuestra);
cancelarEliminarMuestra.addEventListener("click", cerrarModalEliminarMuestra);

contAddCassettes.addEventListener('click',showMuestrasAndDetalles);
muestraForm.addEventListener("submit", postMuestra);
