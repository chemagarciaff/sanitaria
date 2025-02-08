// globales.js
let ordenAscendente = true;
let cassetteSeleccionado = null;

const detalleDescripcion = document.getElementById("descripcion");
const detalleFecha = document.getElementById("fecha");
const detalleOrgano = document.getElementById("organo");
const detalleCaracteristicas = document.getElementById("caracteristicas");
const detalleObservaciones = document.getElementById("observaciones");


document.getElementById("ordenarFecha")?.addEventListener("click", () => ordenarTabla(0));
document.getElementById("ordenarDescripcion")?.addEventListener("click", () => ordenarTabla(1));
document.getElementById("ordenarOrgano")?.addEventListener("click", () => ordenarTabla(2));

