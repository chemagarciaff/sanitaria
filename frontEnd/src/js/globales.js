/*
    Variables globales utilizadas en gestion.html
    Cargar elementos del DOM y variables de control
*/

/* #############################
   ###   Elementos del DOM   ###
   ###########################*/

// Modal Añadir Cassette
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalOverlay = document.getElementById("modal-overlay");

// Inputs de Cassette
const descripcionInput = document.getElementById("descripcionInput");
const fechaInput = document.getElementById("fechaInput");
const organoInput = document.getElementById("organoInput");
const caracteristicasInput = document.getElementById("caracteristicasInput");
const observacionesInput = document.getElementById("observacionesInput");

// Formulario y tabla de cassettes
const cassetteForm = document.getElementById("cassetteForm");
const cassetteTableBody = document.getElementById("cassetteTableBody");
const errorMessage = document.getElementById("error-message");

// Botones de ordenación
const ordenarFechaBtn = document.getElementById("ordenarFecha");
const ordenarDescripcionBtn = document.getElementById("ordenarDescripcion");
const ordenarOrganoBtn = document.getElementById("ordenarOrgano");

// Inputs de filtrado
const filtrarOrgano = document.getElementById("filtrarOrgano");
const fechaInicio = document.getElementById("fechaInicio");
const fechaFin = document.getElementById("fechaFin");

// Detalle del cassette
const detalleDescripcion = document.getElementById("descripcion");
const detalleFecha = document.getElementById("fecha");
const detalleOrgano = document.getElementById("organo");
const detalleCaracteristicas = document.getElementById("caracteristicas");
const detalleObservaciones = document.getElementById("observaciones");

// Modales de eliminar y modificar cassettes
const editarCassetteBtn = document.getElementById("btnEditarCassette");
const eliminarCassetteBtn = document.getElementById("btnEliminarCassette");
const modalEliminar = document.getElementById("modalEliminarCassette");
const modalEditar = document.getElementById("modalEditarCassette");

// Modal de muestras
const modalMuestra = document.getElementById("modalMuestra");
const modalMuestraContent = document.getElementById("modalMuestraContent");
const openModalMuestraBtn = document.getElementById("openModalMuestraBtn");
const closeModalMuestraBtn = document.getElementById("closeModalMuestra");
const muestraForm = document.getElementById("muestraForm");
const errorMuestra = document.getElementById("errorMuestra");

// Variables de control
let ordenAscendente = true;
let cassetteSeleccionado = null;



