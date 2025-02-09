/*
    Funciones de Filtrado y Ordenación
*/

// Función para filtrar la tabla por órgano
const filtrarPorOrgano = () => {
    let filtro = filtrarOrgano.value;
    let filas = Array.from(cassetteTableBody.children);

    filas.forEach(fila => {
        let organo = fila.cells[2].textContent;
        fila.style.display = (filtro === "" || organo === filtro) ? "" : "none";
    });
};

// Función para filtrar por fecha o rango de fechas
const filtrarPorFecha = () => {
    let fechaInicial = fechaInicio.value ? new Date(fechaInicio.value) : null;
    let fechaFinal = fechaFin.value ? new Date(fechaFin.value) : null;

    let filas = Array.from(cassetteTableBody.children);

    filas.forEach(fila => {
        let fechaCassette = new Date(fila.cells[0].textContent);
        let enRango = fechaCassette >= fechaInicial && fechaCassette <= fechaFinal;
        fila.style.display = (!fechaInicial || enRango) ? "" : "none";
    });
};

// Función para ordenar cualquier columna
const ordenarTabla = (columna) => {
    let filas = [...cassetteTableBody.children];

    filas.sort((a, b) =>
        ordenAscendente
            ? a.cells[columna].textContent.localeCompare(b.cells[columna].textContent)
            : b.cells[columna].textContent.localeCompare(a.cells[columna].textContent)
    );

    ordenAscendente = !ordenAscendente;
    cassetteTableBody.replaceChildren(...filas);
};

// Event listeners
filtrarOrgano.addEventListener("change", filtrarPorOrgano);
fechaInicio.addEventListener("change", filtrarPorFecha);
fechaFin.addEventListener("change", filtrarPorFecha);
ordenarFechaBtn.addEventListener("click", () => ordenarTabla(0));
ordenarDescripcionBtn.addEventListener("click", () => ordenarTabla(1));
ordenarOrganoBtn.addEventListener("click", () => ordenarTabla(2));
