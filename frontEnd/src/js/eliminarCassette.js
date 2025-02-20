/*
    Modal de eliminar cassette
*/
const btnEliminarCassette = document.getElementById('btnEliminarCassette');
const modalEliminarCassette = document.getElementById('modalEliminarCassette');
const cerrarEliminarModal = document.getElementById('cerrarEliminarModal');
const cancelarEliminar = document.getElementById('cancelarEliminar');
const confirmarEliminar = document.getElementById('confirmarEliminar');
let muestrasFromCassette = [];
let arrayIdMuestras = [];

/*FUNCIONES*/
//Mostrar modal delete cassette


// Función para abrir el modal de eliminar cassette
const showModalDelete = (event) =>{
    let aux = event.target;

    if (!idCassetteGlobal) {
        errorCrearMuestra.textContent = "Debes seleccionar un cassette antes de eliminarlo.";
        return;
    }

    modalOverlay.classList.remove("hidden");
    modalEliminarCassette.classList.remove("hidden");
    
    setTimeout(() => {
        modalContent.classList.remove("scale-95", "opacity-0");
    }, 10);

    //Comprobar si pulsa al boton eliminar
    if (aux.tagName === "svg" || aux.tagName === "path") {
        modalEliminarCassette.classList.remove('hidden');
    }
}

//Cerrar modal
const closeModalDelete = (event) =>{
    let aux = event.target;

    modalOverlay.classList.add("hidden");
    modalEliminarCassette.classList.add("hidden");
    
    setTimeout(() => {
        modalContent.classList.remove("scale-95", "opacity-0");
    }, 10);

    //Comprobar que boton pulsa
    if (aux === cerrarEliminarModal || aux === cancelarEliminar) {
        modalEliminarCassette.classList.add('hidden');
    }
}

//Accion que elige el usuario en el modal
const actionUserChange = async (event) =>{
    let aux = event.target;
    //Dependiendo del boton que pulse
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

    const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${idCassetteGlobal}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });

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

//Recorrer el array de objetos y sacar el id
const loadIdMuestras = (muestras) =>{
    muestras.forEach((muestra) => {
        arrayIdMuestras.push(muestra.id_muestra)
    });
}

//Eliminar muestras que pertenician al cassett eliminado
const deleteMuestrasFromOneCassette = async (id) =>{
    const token = getAuthToken();

    const reponse = await fetch(`http://localhost:3000/sanitaria/muestras/${id}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });
}

//Recorrer el array de id e eliminar cada uno
const deleteOneMuestraFromId = async () =>{
    for (let id of arrayIdMuestras) {
        await deleteMuestrasFromOneCassette(id);
    }
}

/*EVENTOS*/
btnEliminarCassette.addEventListener('click',showModalDelete);
modalEliminarCassette.addEventListener('click',actionUserChange);
