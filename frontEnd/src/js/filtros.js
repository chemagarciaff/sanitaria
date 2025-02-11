/*
    Funciones del Filtro y Ordenación de Cassettes
    Filtrar por organos, fechas y ordenar los cassettes
*/

/* #################################
   ###   Función de Ordenación   ###
   ###############################*/

   const ordenarTabla = (columna) => {
    let filas = Array.from(cassetteTableBody.children);

    filas.sort((a, b) => {
        let valorA = a.cells[columna].textContent.trim().toLowerCase();
        let valorB = b.cells[columna].textContent.trim().toLowerCase();

        if (columna === 0) { // Ordenar fechas correctamente
            valorA = new Date(a.cells[columna].textContent);
            valorB = new Date(b.cells[columna].textContent);
            return ordenAscendente ? valorA - valorB : valorB - valorA;
        }

        return ordenAscendente
            ? valorA.localeCompare(valorB)
            : valorB.localeCompare(valorA);
    });

    ordenAscendente = !ordenAscendente;

    // No reemplazar `innerHTML`, solo reordenar las filas
    cassetteTableBody.replaceChildren(...filas);
};

/* ################################
   ###   Función de Filtrado   ###
   ##############################*/

   const filtrarPorOrgano = () => {
    let filtro = filtrarOrgano.value.trim().toLowerCase();
    let filas = Array.from(cassetteTableBody.children);

    filas.forEach(fila => {
        let organo = fila.cells[2].textContent.trim().toLowerCase();
        
        // Si se selecciona "Todos", mostrar todas las filas
        if (filtro === "*" || filtro === "") {
            fila.style.display = "";
        } else {
            fila.style.display = organo.includes(filtro) ? "" : "none";
        }
    });
};

/* #######################################
   ###   Función de Filtrado por Fecha ###
   #####################################*/

   const filtrarPorFecha = () => {
    let fechaInicial = fechaInicio.value ? new Date(fechaInicio.value).setHours(0,0,0,0) : null;
    let fechaFinal = fechaFin.value ? new Date(fechaFin.value).setHours(23,59,59,999) : null;
    
    let filas = Array.from(cassetteTableBody.children);

    filas.forEach(fila => {
        let fechaCassette = new Date(fila.cells[0].textContent).setHours(12,0,0,0);

        if (fechaInicial && !fechaFinal) {
            // Si solo se usa el primer input, mostrar solo los cassettes con esa fecha exacta
            fila.style.display = (fechaCassette === fechaInicial) ? "" : "none";
        } else if (fechaInicial && fechaFinal) {
            // Si ambos inputs tienen valor, filtrar en el rango de fechas
            fila.style.display = (fechaCassette >= fechaInicial && fechaCassette <= fechaFinal) ? "" : "none";
        } else {
            // Si no hay filtros de fecha, mostrar todo
            fila.style.display = "";
        }
    });
};

ordenarFechaBtn.removeEventListener("click", () => ordenarTabla(0));
ordenarDescripcionBtn.removeEventListener("click", () => ordenarTabla(1));
ordenarOrganoBtn.removeEventListener("click", () => ordenarTabla(2));

ordenarFechaBtn.addEventListener("click", () => ordenarTabla(0));
ordenarDescripcionBtn.addEventListener("click", () => ordenarTabla(1));
ordenarOrganoBtn.addEventListener("click", () => ordenarTabla(2));

filtrarOrgano.removeEventListener("change", filtrarPorOrgano);
fechaInicio.removeEventListener("change", filtrarPorFecha);
fechaFin.removeEventListener("change", filtrarPorFecha);

filtrarOrgano.addEventListener("change", filtrarPorOrgano);
fechaInicio.addEventListener("change", filtrarPorFecha);
fechaFin.addEventListener("change", filtrarPorFecha);


/* ###################################################
   ###   Función para listar todos los Cassettes   ###
   ################################################ */

const btnListarTodo = document.getElementById("btnListarTodo");

// Función para listar todos los cassettes sin filtros
const listarTodosLosCassettes = () => {
    let filas = Array.from(cassetteTableBody.children);

    // Mostrar todas las filas sin excepción
    filas.forEach(fila => {
        fila.style.display = "";
    });

    // Resetear los filtros para evitar conflictos
    filtrarOrgano.value = "";
    fechaInicio.value = "";
    fechaFin.value = "";
};

// Listener mostrar sin filtros
btnListarTodo.addEventListener("click", listarTodosLosCassettes);

