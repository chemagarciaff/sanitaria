/*
    Funcionalidad del Modal de eliminar cassette
*/

// Variables del dom
const btnEliminarCassette = document.getElementById('btnEliminarCassette');
const modalEliminarCassette = document.getElementById('modalEliminarCassette');
const cerrarEliminarModal = document.getElementById('cerrarEliminarModal');
const cancelarEliminar = document.getElementById('cancelarEliminar');
const confirmarEliminar = document.getElementById('confirmarEliminar');
let muestrasFromCassette = [];
let arrayIdMuestras = [];

/*FUNCIONES*/
// Función para abrir el modal de eliminar cassette
const showModalDelete = (event) =>{
    // Comprobar si hay un cassette seleccionado
    if (!idCassetteGlobal) {
        errorCrearMuestra.textContent = "Debes seleccionar un cassette antes de eliminarlo.";
        return;
    }
    // Mostrar el modal
    modalOverlay.classList.remove("hidden");
    modalEliminarCassette.classList.remove("hidden");
    
    // Animación de entrada
    setTimeout(() => {
        modalContent.classList.remove("scale-95", "opacity-0");
    }, 10);

    //Comprobar si pulsa al boton eliminar
    let aux = event.target;
    if (aux.tagName === "svg" || aux.tagName === "path") {
        modalEliminarCassette.classList.remove('hidden');
    }
}

//Cerrar modal
const closeModalDelete = (event) =>{
    // Ocultar el modal
    modalOverlay.classList.add("hidden");
    modalEliminarCassette.classList.add("hidden");
    
    // Animación de salida
    setTimeout(() => {
        modalContent.classList.remove("scale-95", "opacity-0");
    }, 10);

    // Comprobar que se clique el logo
    let aux = event.target;
    if (aux === cerrarEliminarModal || aux === cancelarEliminar) {
        modalEliminarCassette.classList.add('hidden');
    }
}

//Función para detectar la acción que elige el usuario en el modal
const actionUserChange = async (event) =>{
    //Dependiendo del boton que pulse
    let aux = event.target;
    if (aux === confirmarEliminar) {
        loadIdMuestras(muestrasFromCassette);
        await deleteOneMuestraFromId();
        await deleteOneCassete();
    }else if (aux !== confirmarEliminar) {
        closeModalDelete(event);
    }
}

//Eliminar cassette
const deleteOneCassete = async () =>{
    const token = getAuthToken();
    // Hacer el Delete
    const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${idCassetteGlobal}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });
    // Si está correctamente hecho
    if (response.ok) {
        //Cerramos el modal
        modalEliminarCassette.classList.add('hidden');
        modalOverlay.classList.add('hidden');
        //Cargamos de nuevo los cassetes
        loadCassettes();
        //Cargamos las muestras 
        loadMuestras(idCassetteGlobal);
        //Volvemos a cargar los cassettes
        await loadCassettes();
        await loadOneCassette(idCassetteGlobal);
    }
}

// Función para recorrer el array de objetos y sacar el id
const loadIdMuestras = (muestras) =>{
    muestras.forEach((muestra) => {
        arrayIdMuestras.push(muestra.id_muestra)
    });
}

//Función para eliminar las muestras del cassette eliminado
const deleteMuestrasFromOneCassette = async (id) =>{
    const token = getAuthToken();
    // Hacer el Delete de muestras
    const reponse = await fetch(`http://localhost:3000/sanitaria/muestras/${id}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });
}

//Función para recorrer el array de id e eliminar cada uno
const deleteOneMuestraFromId = async () =>{
    for (let id of arrayIdMuestras) {
        await deleteMuestrasFromOneCassette(id);
    }
}

/*EVENTOS*/
btnEliminarCassette.addEventListener('click',showModalDelete);
modalEliminarCassette.addEventListener('click',actionUserChange);
