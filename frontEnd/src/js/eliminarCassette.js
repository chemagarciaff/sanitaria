/*
    PARTE DE CARLOS PARA BORRAR CASSETTES
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
const showModalDelete = (event) =>{
    let aux = event.target;
    //Comprobar si pulsa al boton eliminar
    if (aux.tagName === "svg" || aux.tagName === "path") {
        modalEliminarCassette.classList.remove('hidden');
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
    const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${idCassetteGlobal}`,{
        method:'DELETE'
    });

    if (response.ok) {
        //Cerramos el modal
        modalEliminarCassette.classList.add('hidden');
        //Cargamos de nuevo los cassetes
        loadCassettes();
        //Cargamos las muestras 
        loadMuestras(idCassetteGlobal);
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
    const reponse = await fetch(`http://localhost:3000/sanitaria/muestras/${id}`,{
        method:'DELETE'
    });
}
//Recorrer el array de id e eliminar cada uno
const deleteOneMuestraFromId = async () =>{
    for (let id of arrayIdMuestras) {
        await deleteMuestrasFromOneCassette(id);
    }
}
//Cerrar modal
const closeModalDelete = (event) =>{
    let aux = event.target;
    //Comprobar que boton pulsa
    if (aux === cerrarEliminarModal || aux === cancelarEliminar) {
        modalEliminarCassette.classList.add('hidden');
    }
}
/*EVENTOS*/
btnEliminarCassette.addEventListener('click',showModalDelete);
modalEliminarCassette.addEventListener('click',actionUserChange);
// document.addEventListener('DOMContentLoaded',loadIdMuestras(muestrasFromCassette))
// /*
//     Funcionalidad para eliminar cassettes desde la API
//     Abre y cierra el modal, elimina el cassette seleccionado
// */

// // Función para abrir el modal de eliminación
// const abrirModalEliminar = () => {
//     if (!cassetteSeleccionado || !cassetteSeleccionado.id_cassette) {
//         console.error("No hay cassette seleccionado para eliminar.");
//         return;
//     }

//     modalEliminar.classList.remove("hidden");
//     modalOverlay.classList.remove("hidden");
// };


// // Función para cerrar el modal de eliminación
// const cerrarModalEliminar = () => {
//     modalEliminar.classList.add("hidden");
//     modalOverlay.classList.add("hidden");
// };

// // Función para eliminar el cassette seleccionado de la API y de la tabla
// const eliminarCassette = async () => {
//     if (!cassetteSeleccionado || !cassetteSeleccionado.id_cassette) {
//         console.error("Error: No hay cassette seleccionado para eliminar.");
//         return;
//     }

//     try {
//         const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${cassetteSeleccionado.id_cassette}`, {
//             method: "DELETE"
//         });

//         if (!response.ok) throw new Error("Error al eliminar el cassette.");

//         console.log("Cassette eliminado correctamente.");

//         // Resetear la selección
//         cassetteSeleccionado = null;

//         // Limpiar detalles del cassette eliminado
//         detalleDescripcion.textContent = "";
//         detalleFecha.textContent = "";
//         detalleOrgano.textContent = "";
//         detalleCaracteristicas.textContent = "";
//         detalleObservaciones.textContent = "";

//         // Cerrar el modal de eliminación
//         cerrarModalEliminar();

//         // Recargar la lista de cassettes para actualizar la tabla
//         loadCassettes();

//     } catch (error) {
//         console.error("Error al eliminar el cassette:", error);
//     }
// };

// // Asegurar que el botón está enlazado correctamente
// document.getElementById("confirmarEliminar").addEventListener("click", eliminarCassette);

// // Verificar que el cassette tiene un ID antes de seleccionarlo
// const seleccionarCassette = (fila) => {
//     if (!fila || !fila.dataset.id) {
//         console.error("La fila seleccionada no tiene un ID válido.");
//         return;
//     }
//     cassetteSeleccionado = fila;
// };

// // Asignar eventos a los botones del modal de eliminación
// document.getElementById("confirmarEliminar").addEventListener("click", eliminarCassette);
// document.getElementById("cancelarEliminar").addEventListener("click", cerrarModalEliminar);
// document.getElementById("cerrarEliminarModal").addEventListener("click", cerrarModalEliminar);
// eliminarCassetteBtn.addEventListener("click", abrirModalEliminar);

