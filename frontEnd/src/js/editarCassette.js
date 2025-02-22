/*
    Funcionalidad del modal de editar cassettes
*/

// Variables del dom
const btnEditCassette = document.getElementById('btnEditarCassette');
const modalEditCassette = document.getElementById('modalEditarCassette');
const cerrarModalEdicion = document.getElementById('cerrarEditarModal');

const editarDescripcion = document.getElementById('editarDescripcion');
const editarFecha = document.getElementById('editarFecha');
const editarOrgano = document.getElementById('editarOrgano');
const editarCaracteristicas = document.getElementById('editarCaracteristicas');
const editarClave = document.getElementById("editarClave");
const editarObservaciones = document.getElementById('editarObservaciones');

const formEditarCassette = document.getElementById('formEditarCassette');
const fechaInputEditar = document.getElementById("editarFecha");

/* FUNCIONES */
// Función para establecer la fecha mínima como la actual
const restringirFechaMinimaEdicion = () => {
    const hoy = new Date().toISOString().split("T")[0];
    fechaInputEditar.setAttribute("min", hoy);
};

//Abrir modal
const openModalEdition = (event) =>{
    // Comprobar si hay un cassette seleccionado
    if (!idCassetteGlobal) {
        errorCrearMuestra.textContent = "Debes seleccionar un cassette antes editarlo.";
        return;
    }
    // Mostrar el modal
    modalOverlay.classList.remove("hidden");
    modalEditCassette.classList.remove("hidden");
    
    // Animación de entrada
    setTimeout(() => {
        modalContent.classList.remove("scale-95", "opacity-0");
    }, 10);

    //Comprobamos si clique en el logo
    let aux = event.target;
    if (aux.tagName === "path" || aux.tagName === "svg") {
        modalEditCassette.classList.remove('hidden');
        showDetailsModalEdition();
    }
};

//Cerrar modal
const closeModalEdition = (event) =>{
    // Ocultar el modal
    modalOverlay.classList.add("hidden");
    modalEditCassette.classList.add("hidden");
    errorMessage.textContent = "";

    // Animación de salida 
    setTimeout(() => {
        modalContent.classList.add("scale-95");
    }, 300);

    // Comprobar que se clique el logo
    let aux = event.target;
    if (aux === cerrarModalEdicion) {
        modalEditCassette.classList.add('hidden');
    }
};

//Mostrar detalles en modal de edicon
const showDetailsModalEdition = () =>{
    //Añadir valor descripcion
    editarDescripcion.value = detalleDescripcion.textContent;
    //Añadir valor fecha
    editarFecha.value = detalleFecha.textContent;
    //Añadir valor organo
    editarOrgano.value = detalleOrgano.textContent;
    //Añadir valor clave
    editarClave.value = detalleClave.textContent;
    //Añadir valor caracteristicas
    editarCaracteristicas.value = detalleCaracteristicas.textContent;
    //Añadir valor observaciones
    editarObservaciones.value = detalleObservaciones.textContent;
};

//Hacer POST a la API con los nuevos datos
const postNewDetailsCassette = async (event) =>{
    event.preventDefault();
    //Creamos el objeto que le vamos a pasar a al API
    const editCassette = {
        fecha_cassette: editarFecha.value,
        descripcion_cassette: editarDescripcion.value,
        organo_cassette: editarOrgano.value,
        clave_cassette: editarClave.value,
        caracteristicas_cassette: editarCaracteristicas.value,
        observaciones_cassette: editarObservaciones.value,
    };

    const token = getAuthToken();
    //Hacemos el PUT
    const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${idCassetteGlobal}`,{
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(editCassette)
    }
    )
    //Si está correctamente hecho
    if (response.ok) {
        const data = await response.json();
        //Cerramos modal
        modalEditCassette.classList.add('hidden');
        modalOverlay.classList.add('hidden');
        //Volvemos a cargar los cassettes
        await loadCassettes();
        await loadOneCassette(idCassetteGlobal);
    }
};

/*EVENTOS*/
btnEditCassette.addEventListener('click',openModalEdition);
cerrarModalEdicion.addEventListener('click',closeModalEdition);
formEditarCassette.addEventListener('submit',postNewDetailsCassette);
document.addEventListener("DOMContentLoaded", restringirFechaMinimaEdicion);