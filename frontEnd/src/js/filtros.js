/* ################################
   ###   Función para Filtrar por Fecha   ###
   ##############################*/

// Función para filtrar por fecha o rango de fechas
const filtrarPorFecha = () => {
    let fechaInicial = fechaInicio.value ? new Date(fechaInicio.value) : null;
    let fechaFinal = fechaFin.value ? new Date(fechaFin.value) : null;

    // Normaliza las fechas a medianoche para evitar diferencias de horas
    if (fechaInicial) {
        fechaInicial.setHours(0, 0, 0, 0);
    }
    if (fechaFinal) {
        fechaFinal.setHours(23, 59, 59, 999);
    }

    let filas = Array.from(cassetteTableBody.children);

    filas.forEach(fila => {
        let fechaCassette = new Date(fila.cells[0].textContent);
        fechaCassette.setHours(0, 0, 0, 0); // Normalizar fecha

        if (fechaInicial && !fechaFinal) {
            // Si solo hay fecha inicial, mostrar solo los cassettes con esa fecha exacta
            fila.style.display = fechaCassette.getTime() === fechaInicial.getTime() ? "" : "none";
        } 
        else if (fechaInicial && fechaFinal) {
            // Si hay fecha de inicio y fecha de fin, mostrar solo los que estén dentro del rango
            let enRango = fechaCassette >= fechaInicial && fechaCassette <= fechaFinal;
            fila.style.display = enRango ? "" : "none";
        } 
        else {
            // Si no hay fechas seleccionadas, mostrar todo
            fila.style.display = "";
        }
    });
};

// Agregar eventos de escucha a los inputs de fecha
fechaInicio.addEventListener("change", filtrarPorFecha);
fechaFin.addEventListener("change", filtrarPorFecha);
