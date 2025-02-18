//VARIABLES
let containerMuestra = document.getElementById('muestraTableBody');
const descripcion = document.getElementById("descripcionMuestra");
const observaciones = document.getElementById("observacionesMuestra");
const fecha = document.getElementById("fechaMuestra");
const tincion = document.getElementById("tincionMuestra");
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
const formEditarMuestra = document.getElementById("formEditarMuestra");

const editarDescripcionMuestra = document.getElementById("editarDescripcionMuestra");
const editarFechaMuestra = document.getElementById("editarFechaMuestra");
const editarTincionMuestra = document.getElementById("editarTincionMuestra");
const editarObservacionesMuestra = document.getElementById("editarObservacionesMuestra");

const detalleDescripcionMuestra = document.getElementById("detalleDescripcionMuestra");
const detalleFechaMuestra = document.getElementById("detalleFechaMuestra");
const detalleTincionMuestra = document.getElementById("detalleTincionMuestra");
const detalleObservacionesMuestra = document.getElementById("detalleObservacionesMuestra");


const file = document.getElementById("imagenMuestra");
let idCassetteGlobal = null;
let imagenPrincipalMuestra = document.getElementById('imagenPrincipalMuestra');
let contenedorMiniaturasMuestra = document.getElementById('contenedorMiniaturasMuestra');
let btnAgregarImagenMuestra = document.getElementById('btnAgregarImagenMuestra');
let addImagenInput = document.getElementById('addImagenInput');


/* 
    Funciones del Modal Añadir Muestras
    Abrir, cerrar modal y validar form del modal

*/

// Almacena la fila seleccionada
let filaCassetteSeleccionado = null;

//Mostrar muestras y detalles del cassette seleccionado
const showMuestrasAndDetalles = async (event) => {
    // llama a la función de modalCassette que saca el ID del cassette seleccionado
    let idCassette = returnIdOfCassette(event);
    idCassetteGlobal = idCassette;

    if (idCassette) {
        // Remover selección anterior
        if (filaCassetteSeleccionado) {
            filaCassetteSeleccionado.classList.remove("bg-teal-100", "font-semibold");
        }

        // Guardar la nueva fila seleccionada y aplicarle la clase
        filaCassetteSeleccionado = event.target.closest("tr");
        if (filaCassetteSeleccionado) {
            filaCassetteSeleccionado.classList.add("bg-teal-100", "font-semibold");
        }

        // Cargar los detalles y muestras del cassette seleccionado
        await loadMuestras(idCassette);
        await loadOneCassette(idCassette);

        //Eliminar errores
        errorCrearMuestra.textContent = "";
        errorMuestra.textContent = "";
    }
};


//Cargar las muestras que pertenecen al cassette
const loadMuestras = async (idCassette) => {
    const response = await fetch(`http://localhost:3000/sanitaria/muestras/cassette/${idCassette}`)
    const data = await response.json();
    createMuestras(data);
    muestrasFromCassette = data;
}

//Crear muestras
const createMuestras = (muestras) => {
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
const loadOneCassette = async (idCassette) => {
    const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${idCassette}`)
    const data = await response.json();
    createDetailOfCassette(data);
}

//Crear los datos de los detalles
const createDetailOfCassette = (cassette) => {
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
const postMuestra = async (event) => {
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
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(muestra)
    })
    //Comprobamos si se ha subido correctamente
    if (response.ok) {
        const data = await response.json();
        const idMuestra = data.id_muestra;

        const imagen = file.files[0];
        //Cargamos la imagen
        if (imagen) {
            // Solo enviamos el archivo Blob sin necesidad de mostrar vista previa
            sendImageToDB(imagen, idMuestra);  // Enviar el archivo Blob al servidor
        }
        //Cerramos el modal
        cerrarModalMuestra();
        //LLamamos a la funcion que saca las muestras para msotrar la muestra creada
        loadMuestras(idCassetteGlobal)
    }
}

const sendImageToDB = async (file, idMuestra) => {
    const formData = new FormData();

    formData.append("imagen", file, file.name);  // El archivo es tratado como un Blob
    formData.append("muestraIdMuestra", idMuestra);  // Otro parámetro que quieras agregar

    try {
        // Enviar la imagen como un Blob usando fetch
        const response = await fetch('http://localhost:3000/sanitaria/imagenes/', {
            method: 'POST',
            body: formData,
        });

        // Comprobar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Error al crear la imagen');
        }

        // Convertir la respuesta en JSON
        const data = await response.json();

        // Mostrar la respuesta de éxito
        console.log("Imagen creada con éxito", data);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error("Error al crear la imagen:", error);
    }
}

// Función para cerrar el modal de muestras
const cerrarModalMuestra = () => {
    modalMuestraContent.classList.add("scale-95");
    setTimeout(() => {
        modalOverlay.classList.add("hidden");
        modalMuestra.classList.add("hidden");
        errorMuestra.textContent = "";
    }, 10);
};



//Cuando se abra el modal de detalle de muestra se cargaran las imagenes de la muestra seleccionada


const obtenerImagenesMuestra = async (idMuestra) => {

    // Vaciamos el contenedor de las imagenes
    contenedorMiniaturasMuestra.innerHTML = '';
    imagenPrincipalMuestra.src = '';

    const response = await fetch(`http://localhost:3000/sanitaria/imagenes/muestra/${idMuestra}`);

    if (response.ok) {

        const imagenes = await response.json();

        let fragment = document.createDocumentFragment();

        imagenes.forEach(async (eachImagen, index) => {

            // Convertir el array de bytes (Buffer) en una cadena Base64
            const byteArray = new Uint8Array(eachImagen.imagen.data);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });

            // Crear una URL de objeto a partir del Blob
            const imageUrl = URL.createObjectURL(blob);


            let contenedorMiniImagen = document.createElement('ARTICLE');
            let miniImagen = document.createElement('IMG');

            contenedorMiniImagen.classList.add('imagenesMiniatura');
            miniImagen.src = imageUrl;
            miniImagen.alt = eachImagen.id_ima;

            if (index == 0) {
                imagenPrincipalMuestra.src = imageUrl;  // Usamos la cadena Base64
                imagenPrincipalMuestra.alt = eachImagen.id_ima;
                contenedorMiniImagen.classList.add('imagenSeleccionada');
            }

            contenedorMiniImagen.append(miniImagen);
            fragment.append(contenedorMiniImagen);
        });

        if (imagenes == "") {
            imagenPrincipalMuestra.src = './../assets/images/no_photo.avif';
        }

        contenedorMiniaturasMuestra.append(fragment);
    }
}


const addImagen = async (event) => {
        const imagen = event.target.files[0];
    
        if (imagen) {
            await sendImageToDB(imagen, muestraSeleccionada.id_muestra);  // Enviar el archivo Blob al servidor
        }
    
        await obtenerImagenesMuestra(muestraSeleccionada.id_muestra);
}


const cambiarImagenPrincipal = (event) => {
    let elemento = event.target;

    if (elemento.nodeName == 'IMG') {

        let imagenes = Array.from(contenedorMiniaturasMuestra.children); // Convierte a array

        // Remueve la clase 'imagenSeleccionada' de todas las miniaturas
        imagenes.forEach(imagen => {
            imagen.classList.remove('imagenSeleccionada');
        });

        // Añade la clase 'imagenSeleccionada' al elemento actual
        elemento.parentElement.classList.add('imagenSeleccionada');

        // Cambia la imagen principal con el src de la miniatura seleccionada
        imagenPrincipalMuestra.src = elemento.src; // Aquí se asume que elemento es la etiqueta <img>
        imagenPrincipalMuestra.alt = elemento.alt; // Aquí se asume que elemento es la etiqueta <img>
    }

}




const eliminarMuestra = async () => {
    const results = await fetch(`http://localhost:3000/sanitaria/muestras/${muestraSeleccionada.id_muestra}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
    });
    cerrarModalEliminarMuestra();
    cerrarModalDetalleMuestra();
    loadMuestras(idCassetteGlobal);
}

const editarValoresMuestra = async (event) => {
    event.preventDefault();
    
    let body = {
        tincion_muestra: editarTincionMuestra.value,
        descripcion_muestra: editarDescripcionMuestra.value,
        fecha_muestra: editarFechaMuestra.value,
        observaciones_muestra: editarObservacionesMuestra.value,
    }
    
    const results = await fetch(`http://localhost:3000/sanitaria/muestras/${muestraSeleccionada.id_muestra}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body),
    })
        
    cerrarModalEditarMuestra();
    cerrarModalDetalleMuestra();
    loadMuestras(idCassetteGlobal);
}


let muestraSeleccionada = {};

// Función para abrir el modal de detalles de muestra
const abrirModalDetalleMuestra = (muestra) => {
    // Asignar el valor a la variable muestra global
    muestraSeleccionada = muestra;
    
    // Asignar los valores al modal de detalle muestra
    detalleDescripcionMuestra.textContent = muestra.descripcion_muestra;
    detalleFechaMuestra.textContent = new Date(muestra.fecha_muestra).toISOString().split('T')[0];
    detalleTincionMuestra.textContent = muestra.tincion_muestra;
    detalleObservacionesMuestra.textContent = muestra.observaciones_muestra;
    imagenPrincipalMuestra.src = muestra.imagen_muestra ? muestra.imagen_muestra : "ruta/default-image.jpg"; // Imagen por defecto si no tiene
    
    //Cargamos las imagenes
    obtenerImagenesMuestra(muestra.id_muestra);
    
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
    }, 300);
};


// Función para abrir el modal de editar muestras
const abrirModalEditarMuestra = () => {
    // Obtener los valores actuales del modal de detalles
    editarDescripcionMuestra.value = muestraSeleccionada.descripcion_muestra;
    editarFechaMuestra.value = muestraSeleccionada.fecha_muestra.split("T")[0];
    editarTincionMuestra.value = muestraSeleccionada.tincion_muestra;
    editarObservacionesMuestra.value = muestraSeleccionada.observaciones_muestra;
    
    
    
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

addImagenInput.addEventListener('change', addImagen);


// Event listeners para abrir/cerrar modal
openModalMuestraBtn.addEventListener("click", abrirModalMuestra);
closeModalMuestraBtn.addEventListener("click", cerrarModalMuestra);


contAddCassettes.addEventListener('click', showMuestrasAndDetalles);
muestraForm.addEventListener("submit", postMuestra);
contenedorMiniaturasMuestra.addEventListener('click', cambiarImagenPrincipal);

// Limitar fecha input
document.addEventListener("DOMContentLoaded", () => {
    const fechaMuestraInput = document.getElementById("fechaMuestra");
    fechaMuestraInput.setAttribute("min", new Date().toISOString().split("T")[0]);
});

cerrarDetalleMuestra.addEventListener("click", cerrarModalDetalleMuestra);
btnEditarMuestra.addEventListener("click", abrirModalEditarMuestra);
cerrarEditarMuestra.addEventListener("click", cerrarModalEditarMuestra);

btnEliminarMuestra.addEventListener("click", abrirModalEliminarMuestra);
confirmarEliminarMuestra.addEventListener("click", eliminarMuestra);
cerrarEliminarMuestra.addEventListener("click", cerrarModalEliminarMuestra);
cancelarEliminarMuestra.addEventListener("click", cerrarModalEliminarMuestra);

contAddCassettes.addEventListener('click', showMuestrasAndDetalles);
muestraForm.addEventListener("submit", postMuestra);
btnAgregarImagenMuestra.addEventListener('click', () => {
    addImagenInput.click();
});

formEditarMuestra.addEventListener('submit', editarValoresMuestra);