// VARIABLES
let containerMuestra = document.getElementById('muestraTableBody');
const descripcion = document.getElementById("descripcionMuestra");
const observaciones = document.getElementById("observacionesMuestra");
const fecha = document.getElementById("fechaMuestra");
const tincion = document.getElementById("tincionMuestra");
const imagen = document.getElementById("imagenMuestra");

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

/* FUNCIÓN PARA OBTENER EL TOKEN */
const getAuthToken = () => {
    const token = sessionStorage.getItem('usuarioLoggeado');
    const tokenValue = JSON.parse(token);
    return tokenValue ? tokenValue.success : null;
};

// Cargar muestras de un cassette con autenticación
const loadMuestras = async (idCassette) => {
    const token = getAuthToken();
    if (!token) return;

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/muestras/cassette/${idCassette}`, {
            headers: {
                'Content-Type': 'application/json',
                'user-token': token
            }
        });

        if (!response.ok) throw new Error("Error al cargar muestras.");
        
        const data = await response.json();
        createMuestras(data);
    } catch (error) {
        console.error("Error al obtener muestras:", error);
    }
};

// Crear las muestras en la interfaz
const createMuestras = (muestras) => {
    containerMuestra.innerHTML = "";
    let fragment = document.createDocumentFragment();

    muestras.forEach((muestra) => {
        let fila = document.createElement('tr');
        fila.classList.add("border-b", "hover:bg-gray-100");

        let fecha = document.createElement('td');
        fecha.textContent = new Date(muestra.fecha_muestra).toISOString().split('T')[0];
        fecha.classList.add("p-2", "text-gray-700", "text-left");
        fila.appendChild(fecha);

        let descripcion = document.createElement('td');
        descripcion.textContent = muestra.descripcion_muestra;
        descripcion.classList.add("p-2", "text-gray-700", "text-left");
        fila.appendChild(descripcion);

        let tincion = document.createElement('td');
        tincion.textContent = muestra.tincion_muestra;
        tincion.classList.add("p-2", "text-gray-700", "text-left");
        fila.appendChild(tincion);

        let columIcono = document.createElement('td');
        columIcono.classList.add("p-2", "text-center");

        let icono = document.createElement('i');
        icono.classList.add("fa-solid", "fa-file", "cursor-pointer", "text-teal-500", "hover:text-teal-400");
        icono.setAttribute("data-id", muestra.id_muestra);
        icono.addEventListener("click", () => abrirModalDetalleMuestra(muestra));
        
        columIcono.appendChild(icono);
        fila.appendChild(columIcono);
        fragment.appendChild(fila);
    });

    containerMuestra.appendChild(fragment);
};

// Añadir una muestra con autenticación
const postMuestra = async (event) => {
    event.preventDefault();
    const token = getAuthToken();
    if (!token) return;

    const muestra = {
        fecha_muestra: fecha.value.trim(),
        observaciones_muestra: observaciones.value.trim(),
        descripcion_muestra: descripcion.value.trim(),
        tincion_muestra: tincion.value,
        cassetteIdCassette: idCassetteGlobal
    };

    try {
        const response = await fetch('http://localhost:3000/sanitaria/muestras/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-token': token
            },
            body: JSON.stringify(muestra)
        });

        if (!response.ok) throw new Error("Error al agregar la muestra.");

        cerrarModalMuestra();
        loadMuestras(idCassetteGlobal);
    } catch (error) {
        console.error("Error al enviar la muestra:", error);
    }
};

// Editar una muestra con autenticación
const editarValoresMuestra = async (event) => {
    event.preventDefault();
    const token = getAuthToken();
    if (!token) return;

    let body = {
        tincion_muestra: editarTincionMuestra.value,
        descripcion_muestra: editarDescripcionMuestra.value,
        fecha_muestra: editarFechaMuestra.value,
        observaciones_muestra: editarObservacionesMuestra.value
    };

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/muestras/${muestraSeleccionada.id_muestra}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'user-token': token
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) throw new Error("Error al editar la muestra.");

        cerrarModalEditarMuestra();
        loadMuestras(idCassetteGlobal);
    } catch (error) {
        console.error("Error al editar la muestra:", error);
    }
};

// Eliminar muestra con autenticación
const eliminarMuestra = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/muestras/${muestraSeleccionada.id_muestra}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'user-token': token
            }
        });

        if (!response.ok) throw new Error("Error al eliminar la muestra.");

        cerrarModalEliminarMuestra();
        loadMuestras(idCassetteGlobal);
    } catch (error) {
        console.error("Error al eliminar la muestra:", error);
    }
};

/* EVENTOS */
openModalMuestraBtn.addEventListener("click", abrirModalMuestra);
closeModalMuestraBtn.addEventListener("click", cerrarModalMuestra);
btnEditarMuestra.addEventListener("click", abrirModalEditarMuestra);
btnEliminarMuestra.addEventListener("click", abrirModalEliminarMuestra);
confirmarEliminarMuestra.addEventListener("click", eliminarMuestra);
formEditarMuestra.addEventListener('submit', editarValoresMuestra);
muestraForm.addEventListener("submit", postMuestra);
