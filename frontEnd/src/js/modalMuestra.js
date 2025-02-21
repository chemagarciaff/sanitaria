/*
    Funciones de los Modales de Muestra
    Abrir y cerrar modal, enviar form del modal, crear, modificar y eliminar muestras,
    cargar imagenes de la muestra seleccionada, cambiar y eliminar imagene
*/


// Cargar variables del dom
let containerMuestra = document.getElementById('muestraTableBody');
const descripcion = document.getElementById("descripcionMuestra");
const observaciones = document.getElementById("observacionesMuestra");
const fecha = document.getElementById("fechaMuestra");
const tincion = document.getElementById("tincionMuestra");
const imagen = document.getElementById("imagenMuestra").files[0];

const btnEditarMuestra = document.getElementById("btnEditarMuestra");
const btnEliminarMuestra = document.getElementById("btnEliminarMuestra");
const btnEliminarImagen = document.getElementById("btnEliminarImagen");
const imagen_qr = document.getElementById("imagen_qr");

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
    FUNCIONES
*/

// Almacena la fila seleccionada
let filaCassetteSeleccionado = null;

//Función para mostrar muestras y detalles del cassette seleccionado
const showMuestrasAndDetalles = async (event) => {
    // Saca el ID del cassette seleccionado
    let idCassette = returnIdOfCassette(event);
    idCassetteGlobal = idCassette;

    // Si hay un cassette seleccionado:
    if (idCassette) {
        // Quitar la selección anterior
        if (filaCassetteSeleccionado) {
            filaCassetteSeleccionado.classList.remove("bg-teal-100", "font-semibold");
        }

        // Guardar la nueva fila seleccionada
        filaCassetteSeleccionado = event.target.closest("tr");
        if (filaCassetteSeleccionado) {
            filaCassetteSeleccionado.classList.add("bg-teal-100", "font-semibold");
        }

        // Cargar los datos del cassette seleccionado
        await loadMuestras(idCassette);
        await loadOneCassette(idCassette);

        //Eliminar errores
        errorCrearMuestra.textContent = "";
        errorMuestra.textContent = "";
    }
};

//Función para cargar las muestras que pertenecen al cassette
const loadMuestras = async (idCassette) => {
    // Hacer el Get
    const token = getAuthToken();
    const response = await fetch(`http://localhost:3000/sanitaria/muestras/cassette/${idCassette}`, {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token,
        }
    });
    // Verificar y listar muestras
    const data = await response.json();
    createMuestras(data);
    muestrasFromCassette = data;
}

// Función para crear muestras
const createMuestras = (muestras) => {
    containerMuestra.innerHTML = "";
    let fragment = document.createDocumentFragment();

    //Recorremos el array de objetos
    muestras.forEach((muestra) => {
        // Fila
        let fila = document.createElement('tr');
        fila.classList.add("border-b", "hover:bg-gray-100");

        // Columna fecha
        let fecha = document.createElement('td');

        // Objeto Date
        const fechaDate = new Date(muestra.fecha_muestra);
        const fechaFormateada = fechaDate.toISOString().split('T')[0];
        fecha.textContent = fechaFormateada;
        fecha.classList.add("p-2", "text-gray-700", "text-left");
        fila.appendChild(fecha);

        // Columna descripcion
        let descripcion = document.createElement('td');
        descripcion.textContent = muestra.descripcion_muestra;
        descripcion.classList.add("p-2", "text-gray-700", "text-left");
        fila.appendChild(descripcion);

        // Columna tincion
        let tincion = document.createElement('td');
        tincion.textContent = muestra.tincion_muestra;
        tincion.classList.add("p-2", "text-gray-700", "text-left");
        fila.appendChild(tincion);

        // Columna icono
        let columIcono = document.createElement('td');
        columIcono.classList.add("p-2", "text-center");

        // Icono del cassette
        let icono = document.createElement('i');
        icono.classList.add("p-none", "mt-4", "icono", "fa-solid", "fa-file", "relative", "w-8", "h-8", "text-teal-500", "detalle-cassette", "cursor-pointer", "hover:text-teal-400", "active:text-teal-700");
        icono.setAttribute("data-id", muestra.id_muestra);
        icono.addEventListener("click", () => abrirModalDetalleMuestra(muestra));
        columIcono.appendChild(icono);
        fila.appendChild(columIcono);

        fragment.appendChild(fila);
    });

    containerMuestra.appendChild(fragment)
};

// Función para cargar un cassette
const loadOneCassette = async (id) => {
    // Hacer el Get
    const token = getAuthToken()
    if (!token) return;
    const response = await fetch(`http://localhost:3000/sanitaria/cassettes/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token,
        }
    });
    const cassette = await response.json();
    // Actualizar detalles 
    updateCassetteDetails(cassette);
};

// Función para abrir el modal de muestras
const abrirModalMuestra = (event) => {
    // Comprobar si hay un cassette seleccionado
    if (!idCassetteGlobal) {
        errorCrearMuestra.textContent = "Debes seleccionar un cassette antes de añadir una muestra.";
        return;
    }
    // Limpiar errores
    errorCrearMuestra.textContent = "";
    errorMuestra.textContent = "";

    // Mostrar el modal
    modalOverlay.classList.remove("hidden");
    modalMuestra.classList.remove("hidden");

    // Animación de entrada
    setTimeout(() => {
        modalMuestraContent.classList.remove("scale-95");
    }, 10);
};

// Función para cerrar el modal de muestras
const cerrarModalMuestra = () => {
    // Ocultar el modal
    modalOverlay.classList.add("hidden");
    modalMuestra.classList.add("hidden");
    errorMuestra.textContent = "";

    // Animación de salida
    setTimeout(() => {
        modalMuestraContent.classList.add("scale-95");
    }, 10);
};

// Hacer POST con los datos del modal muestra
const postMuestra = async (event) => {
    event.preventDefault();
    // let qr_muestra = await generarQr();

    //Creamos el objeto muestra
    // Validar formulario antes de prosegir
    if (!validarFormularioMuestra()) {
        return;
    }

    //Creamos el objeto muestra con los valores del formulario
    const muestra = {
        fecha_muestra: fecha.value.trim(),
        observaciones_muestra: observaciones.value.trim(),
        descripcion_muestra: descripcion.value.trim(),
        tincion_muestra: tincion.value,
        qr_muestra: 'E3454',
        cassetteIdCassette: idCassetteGlobal
    }

    //Hacemos el post de los datos que nos pasa el usuario
    const token = getAuthToken();
    const response = await fetch('http://localhost:3000/sanitaria/muestras/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token,
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

        // Limpiar el formulario después de crear la muestra
        resetFormularioMuestra();
        //Cerramos el modal
        cerrarModalMuestra();
        //LLamamos a la funcion que saca las muestras para msotrar la muestra creada
        loadMuestras(idCassetteGlobal)
    };
};

// Función para validar el formulario crear muestra
const validarFormularioMuestra = () => {
    // Obtener datos del formulario
    const descripcionValor = descripcion.value.trim();
    const fechaValor = fecha.value.trim();
    const tincionValor = tincion.value;
    const observacionesValor = observaciones.value.trim();

    // Validar campos obligatorios 
    if (!descripcionValor || !fechaValor || !tincionValor || tincionValor === "Seleccionar" || !observacionesValor ) {
        errorMuestra.textContent = "Todos los campos excepto la imagen son obligatorios.";
        return false;
    }

    // Indicar que la validación fue exitosa y borrar error
    errorMuestra.textContent = "";
    return true;
};

// Función para limpiar el form de crear muestras
const resetFormularioMuestra = () => {
    descripcion.value = "";
    fecha.value = "";
    tincion.selectedIndex = 0;
    observaciones.value = "";
    file.value = ""; 
    errorMuestra.textContent = "";
};

// Función para actualizar detalles de la muestra
const sendImageToDB = async (file, idMuestra) => {
    const formData = new FormData();
    const token = getAuthToken();
    if (!token) return;
    // El archivo es tratado como un Blob
    formData.append("imagen", file, file.name);
    // Otro parámetro que quieras agregar
    formData.append("muestraIdMuestra", idMuestra);

    try {
        // Enviar la imagen como un Blob usando fetch
        const response = await fetch('http://localhost:3000/sanitaria/imagenes/', {
            method: 'POST',
            headers: {
                'user-token': token,
            },
            body: formData,
        });

        // Comprobar si la respuesta funciona
        if (!response.ok) {
            throw new Error('Error al crear la imagen');
        }

        const data = await response.json();
        console.log("Imagen creada con éxito", data);

        // En caso de error:
    } catch (error) {
        console.error("Error al crear la imagen:", error);
    }
}




//Función para cuando se abra el modal de detalle de muestra se cargaran las imagenes de la muestra seleccionada
const obtenerImagenesMuestra = async (idMuestra) => {

    // Vaciamos el contenedor de las imagenes
    contenedorMiniaturasMuestra.innerHTML = '';
    imagenPrincipalMuestra.src = '';

    const token = getAuthToken();
    // Hacer el Get
    const response = await fetch(`http://localhost:3000/sanitaria/imagenes/muestra/${idMuestra}`, {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token,
        }
    });

    // Verificar y listar imagenes
    if (response.ok) {
        const imagenes = await response.json();
        let fragment = document.createDocumentFragment();
        // Recorrer el array de objetos
        imagenes.forEach(async (eachImagen, index) => {

            // Convertir el array de bytes (Buffer) en una cadena Base64
            const byteArray = new Uint8Array(eachImagen.imagen.data);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });

            // Crear una URL de objeto a partir del Blob
            const imageUrl = URL.createObjectURL(blob);

            // Craear contenedor para la img
            let contenedorMiniImagen = document.createElement('ARTICLE');
            let miniImagen = document.createElement('IMG');

            contenedorMiniImagen.classList.add('imagenesMiniatura');
            miniImagen.src = imageUrl;
            miniImagen.alt = eachImagen.id_ima;
            
            if (index == 0) {
                // Usamos la cadena Base64
                imagenPrincipalMuestra.src = imageUrl;
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
};

// Función para añadir imagen a la muestra
const addImagen = async (event) => {
    const imagen = event.target.files[0];
    // Verificar si hay una muestra seleccionada
    if (imagen) {
        // Enviar el archivo Blob al servidor
        await sendImageToDB(imagen, muestraSeleccionada.id_muestra);
    }

    await obtenerImagenesMuestra(muestraSeleccionada.id_muestra);
};

// Función para cambiar la imagen principal
const cambiarImagenPrincipal = (event) => {
    let elemento = event.target;
    // Si el elemento es una imagen seguir
    if (elemento.nodeName == 'IMG') {
        // Convierte a array
        let imagenes = Array.from(contenedorMiniaturasMuestra.children);

        // Borrar la img
        imagenes.forEach(imagen => {
            imagen.classList.remove('imagenSeleccionada');
        });

        elemento.parentElement.classList.add('imagenSeleccionada');

        // Cambia la imagen principal con el src de la miniatura seleccionada
        imagenPrincipalMuestra.src = elemento.src; 
        imagenPrincipalMuestra.alt = elemento.alt;
    }

};

// Función para eliminar la imagen de portada
const eliminarImagenPrincipal = async () => {
    const token = getAuthToken();
    // Hacer el Delete
    const results = await fetch(`http://localhost:3000/sanitaria/imagenes/${imagenPrincipalMuestra.alt}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token,
        }
    });
    // Actualizar imagenes
    obtenerImagenesMuestra(muestraSeleccionada.id_muestra);
};

// Función para eliminar la muestra
const eliminarMuestra = async () => {
    const token = getAuthToken();
    // Hacer el Delete
    const results = await fetch(`http://localhost:3000/sanitaria/muestras/${muestraSeleccionada.id_muestra}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token,
        }
    });
    // Cerrar modales y recargar muestras
    cerrarModalEliminarMuestra();
    cerrarModalDetalleMuestra();
    loadMuestras(idCassetteGlobal);
};

// Función para editar los datos de muestra
const editarValoresMuestra = async (event) => {
    event.preventDefault();
    const token = getAuthToken();

    // Validar el form antes de seguir
    let body = {
        tincion_muestra: editarTincionMuestra.value,
        descripcion_muestra: editarDescripcionMuestra.value,
        fecha_muestra: editarFechaMuestra.value,
        observaciones_muestra: editarObservacionesMuestra.value,
    }
    // Hacer el Patch
    const results = await fetch(`http://localhost:3000/sanitaria/muestras/${muestraSeleccionada.id_muestra}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token,
        },
        body: JSON.stringify(body),
    })
    // Comprobar que se haya editado bien y cerrar modal
    cerrarModalEditarMuestra();
    cerrarModalDetalleMuestra();
    loadMuestras(idCassetteGlobal);
};


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
    // Imagen por defecto si no tiene
    imagenPrincipalMuestra.src = muestra.imagen_muestra ? muestra.imagen_muestra : "ruta/default-image.jpg";
    //Cargamos las imagenes
    obtenerImagenesMuestra(muestra.id_muestra);

    // Mostrar el modal
    modalOverlay.classList.remove("hidden");
    modalDetalleMuestra.classList.remove("hidden");
};

// Función para cerrar el modal de muestras
const cerrarModalDetalleMuestra = () => {
    // Ocultar modal
    modalOverlay.classList.add("hidden");
    modalDetalleMuestra.classList.add("hidden");
    modalEditarMuestra.classList.add("hidden");
    modalEliminarMuestra.classList.add("hidden");
    // Animación de salida
    setTimeout(() => {
        modalMuestraContent.classList.add("scale-95");
    }, 300);
};


// Función para abrir el modal de editar muestras
const abrirModalEditarMuestra = () => {
    // Obtener los valores actuales del modal de detalles
    editarDescripcionMuestra.value = muestraSeleccionada.descripcion_muestra;
    editarFechaMuestra.value = muestraSeleccionada.fecha_muestra.split("T")[0];
    editarTincionMuestra.value = muestraSeleccionada.tincion_muestra;
    editarObservacionesMuestra.value = muestraSeleccionada.observaciones_muestra;

    // Mostrar modal
    modalOverlayEditarMuestra.classList.remove("hidden");
    modalEditarMuestra.classList.remove("hidden");
};

// Función para cerrar el modal de muestras
const cerrarModalEditarMuestra = () => {
    // Ocultar modal
    modalOverlayEditarMuestra.classList.add("hidden");
    modalEditarMuestra.classList.add("hidden");
    errorEditarMuestra.textContent = "";
    // Animación de salida
    setTimeout(() => {
        modalEditarMuestra.classList.add("scale-95");
    }, 300);
};

// Función para abrir el modal de eliminar muestras
const abrirModalEliminarMuestra = () => {
    modalOverlayEditarMuestra.classList.remove("hidden");
    modalEliminarMuestra.classList.remove("hidden");
};

// Función para cerrar el modal de eliminar muestras
const cerrarModalEliminarMuestra = () => {
    // Ocultar modal
    modalOverlayEditarMuestra.classList.add("hidden");
    modalEliminarMuestra.classList.add("hidden");
    // Animación de salida
    setTimeout(() => {
        modalEliminarMuestra.classList.add("scale-95");
    }, 300);
};

// Listeners

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
btnEliminarImagen.addEventListener("click", eliminarImagenPrincipal)

btnEliminarMuestra.addEventListener("click", abrirModalEliminarMuestra);
confirmarEliminarMuestra.addEventListener("click", eliminarMuestra);
cerrarEliminarMuestra.addEventListener("click", cerrarModalEliminarMuestra);
cancelarEliminarMuestra.addEventListener("click", cerrarModalEliminarMuestra);


contAddCassettes.addEventListener('click', showMuestrasAndDetalles);
muestraForm.addEventListener("submit", postMuestra);
btnAgregarImagenMuestra.addEventListener('click', () => {
    addImagenInput.value = "";
    addImagenInput.click();
});

formEditarMuestra.addEventListener('submit', editarValoresMuestra);