//VARIABLES
let containerMuestra = document.getElementById('muestraTableBody');

/* 
    Funciones del Modal Añadir Muestras
    Abrir, cerrar modal y validar form del modal

*/

//Mostrar muestras y detalles del cassette seleccionado
const showMuestrasAndDetalles = async (event) =>{
    let idCassette = returnIdOfCassette(event);
    if (idCassette) {
        loadMuestras(idCassette);
        loadOneCassette(idCassette);
    }
}
//Cargar las muestras que pertenecen al cassette
const loadMuestras = async (idCassette) =>{
    const response = await fetch(`http://localhost:3000/sanitaria/muestras/cassette/${idCassette}`)
    const data = await response.json();
    createMuestras(data);
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
        //Columna fecha
        let fecha = document.createElement('td');
        fecha.textContent = muestra.fecha_muestra;
        fila.appendChild(fecha);
        //Columna descripcion
        let descripcion = document.createElement('td');
        descripcion.textContent = muestra.descripcion_muestra;
        fila.appendChild(descripcion);
        //Columna tincion
        let tincion = document.createElement('td');
        tincion.textContent = muestra.tincion_muestra;
        fila.appendChild(tincion);
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

contAddCassettes.addEventListener('click',showMuestrasAndDetalles);