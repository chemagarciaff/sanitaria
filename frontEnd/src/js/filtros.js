// Filtrar por órgano
const filtrarPorOrgano = () => {
    let filtro = filtrarOrgano.value;
    let filas = Array.from(cassetteTableBody.children);
    filas.forEach(fila => {
        let organo = fila.cells[2].textContent;
        fila.style.display = filtro === "" || organo === filtro ? "" : "none";
    });
};

// Filtrar por fecha
const filtrarPorFecha = () => {
    let fechaInicial = fechaInicio.value ? new Date(fechaInicio.value) : null;
    let fechaFinal = fechaFin.value ? new Date(fechaFin.value) : null;
    let filas = Array.from(cassetteTableBody.children);
    filas.forEach(fila => {
        let fechaCassette = new Date(fila.cells[0].textContent);
        let enRango = (!fechaInicial || fechaCassette >= fechaInicial) && (!fechaFinal || fechaCassette <= fechaFinal);
        fila.style.display = enRango ? "" : "none";
    });
};

// Ordenar tabla
const ordenarTabla = (columna) => {
    const filas = [...cassetteTableBody.children];
    filas.sort((a, b) => ordenAscendente
        ? a.cells[columna].textContent.localeCompare(b.cells[columna].textContent)
        : b.cells[columna].textContent.localeCompare(a.cells[columna].textContent)
    );
    ordenAscendente = !ordenAscendente;
    cassetteTableBody.replaceChildren(...filas);
};

// Event Listeners
filtrarOrgano.addEventListener("change", filtrarPorOrgano);
fechaInicio.addEventListener("change", filtrarPorFecha);
fechaFin.addEventListener("change", filtrarPorFecha);
