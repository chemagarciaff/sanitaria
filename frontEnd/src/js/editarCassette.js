/*
    Editar Cassette
*/
const btnEditCassette = document.getElementById('btnEditarCassette');
const modalEditCassette = document.getElementById('modalEditarCassette');
const cerrarModalEdicion = document.getElementById('cerrarEditarModal');
const editarDescripcion = document.getElementById('editarDescripcion');
const editarFecha = document.getElementById('editarFecha');
const editarOrgano = document.getElementById('editarOrgano');
const editarCaracteristicas = document.getElementById('editarCaracteristicas');
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

    if (!idCassetteGlobal) {
        errorCrearMuestra.textContent = "Debes seleccionar un cassette antes editarlo.";
        return;
    }

    modalOverlay.classList.remove("hidden");
    modalEditCassette.classList.remove("hidden");
    
    setTimeout(() => {
        modalContent.classList.remove("scale-95", "opacity-0");
    }, 10);

    let aux = event.target;
    //Comporbamos si clicka en el logo
    if (aux.tagName === "path" || aux.tagName === "svg") {
        modalEditCassette.classList.remove('hidden');
        showDetailsModalEdition();
    }
}

//Cerrar modal
const closeModalEdition = (event) =>{

    modalContent.classList.add("scale-95");
    setTimeout(() => {
        modalOverlay.classList.add("hidden");
        modalEditCassette.classList.add("hidden");
        errorMessage.textContent = "";
    }, 300);

    let aux = event.target;
    if (aux === cerrarModalEdicion) {
        modalEditCassette.classList.add('hidden');
    }
}

//Mostrar detalles en modal de edicon
const showDetailsModalEdition = () =>{
    //Añadir valor descripcion
    editarDescripcion.value = detalleDescripcion.textContent;
    //Añadir valor fecha
    editarFecha.value = detalleFecha.textContent;
    //Añadir valor organo
    editarOrgano.value = detalleOrgano.textContent;
    //Añadir valor caracteristicas
    editarCaracteristicas.value = detalleCaracteristicas.textContent;
    //Añadir valor observaciones
    editarObservaciones.value = detalleObservaciones.textContent;
}

//Hacer POST a la API con los nuevos datos
const postNewDetailsCassette = async (event) =>{
    event.preventDefault();
    //Creamos el objeto que le vamos a pasar a al API
    const editCassette = {
        fecha_cassette: editarFecha.value,
        descripcion_cassette: editarDescripcion.value,
        organo_cassette: editarOrgano.value,
        caracteristicas_cassette: editarCaracteristicas.value ,
        observaciones_cassette: editarObservaciones.value,
    };
    //Hacemos el PUT
    const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${idCassetteGlobal}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCassette)
    }
    )
    //Si esta correctamente hecho
    if (response.ok) {
        const data = await response.json();
        //Cerramos modal
        modalEditCassette.classList.add('hidden');
        modalOverlay.classList.add('hidden');
        //Volvemos a cargar los cassettes
        await loadCassettes();
        await loadOneCassette(idCassetteGlobal);
    }
}

/*EVENTOS*/
btnEditCassette.addEventListener('click',openModalEdition);
cerrarModalEdicion.addEventListener('click',closeModalEdition);
formEditarCassette.addEventListener('submit',postNewDetailsCassette);
document.addEventListener("DOMContentLoaded", restringirFechaMinimaEdicion);
closeModalBtn.addEventListener("click", cerrarModal);
modalOverlay.addEventListener("click", cerrarModal);

