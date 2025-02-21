/*
    Funciones del Filtro y Ordenación de Cassettes
    Filtrar por organos, fechas y ordenar los cassettes
*/

/* #################################
   ###   Función de Ordenación   ###
   ###############################*/

const botonAdministrar = document.getElementById('botonAdministrar');
const btnCerrarSesion = document.getElementById('btnLogaut');

const cerrarSession = (event) =>{
        //Limpiamos el session storage
        sessionStorage.clear()
        //Redirigimos al index
        location.href = "./../index.html";
}

// Función para ordenar las tablas por columnas
const ordenarTabla = (columna) => {
    let filas = Array.from(cassetteTableBody.children);

    filas.sort((a, b) => {
        // Obtener el valor de las celdas de la columna seleccionada
        let valorA = a.cells[columna].textContent.trim().toLowerCase();
        let valorB = b.cells[columna].textContent.trim().toLowerCase();

        // Ordenar fechas correctamente
        if (columna === 0) {
            valorA = new Date(a.cells[columna].textContent);
            valorB = new Date(b.cells[columna].textContent);
            return ordenAscendente ? valorA - valorB : valorB - valorA;
        }
        // Ordenar lo que reciba
        return ordenAscendente
            ? valorA.localeCompare(valorB)
            : valorB.localeCompare(valorA);
    });

    ordenAscendente = !ordenAscendente;

    // No reemplazar "innerHTML", solo reordenar las filas
    cassetteTableBody.replaceChildren(...filas);
};

/* ##########################################
   ###   Función de Filtrado por Organos  ###
   ########################################*/

// Función para filtrar por organos los cassettes
const filtrarPorOrgano = () => {
    // Obtener el valor del filtro
    let filtro = filtrarOrgano.value.trim().toLowerCase();
    let filas = Array.from(cassetteTableBody.children);
    // Recorrer cada fila
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

// Filtrar cassettes por fecha
const filtrarPorFecha = () => {
    // Obtener las fechas
    let fechaInicial = fechaInicio.value || null;
    let fechaFinal = fechaFin.value || null;
    let filas = Array.from(cassetteTableBody.children);
    // Recorrer todas las filas
    filas.forEach(fila => {
        // Obtener la fecha directamente
        let fechaCassette = fila.cells[0].textContent;
        // Filtrado en cuestión
        if (fechaInicial && !fechaFinal) {
            // Mostrar solo los cassettes con la fecha exacta seleccionada
            fila.style.display = (fechaCassette === fechaInicial) ? "" : "none";
        } else if (fechaInicial && fechaFinal) {
            // Filtrar en el rango de fechas
            fila.style.display = (fechaCassette >= fechaInicial && fechaCassette <= fechaFinal) ? "" : "none";
        } else {
            // Mostrar todos los cassettes si no hay filtro
            fila.style.display = "";
        }
    });
};

// Restringir fechaFin para que no sea anterior a fechaInicio
fechaInicio.addEventListener("change", () => {
    let fechaSeleccionada = fechaInicio.value;

    if (fechaSeleccionada) {
        fechaFin.setAttribute("min", fechaSeleccionada);
    } else {
        // Si fechaInicio se borra, eliminar restricción
        fechaFin.removeAttribute("min");
    }

    // Aplicar filtro cuando se cambia fechaInicio
    filtrarPorFecha();
});

// Aplicar filtro cuando cambia fechaFin
fechaFin.addEventListener("change", filtrarPorFecha);


/* ##########################################
   ###   Función de Filtrado por Clave    ###
   ########################################*/

// Función para filtrar por clave los cassettes
const filtrarPorClave = () => {
    // Obtener las claves
    let filtro = claveCassette.value.trim().toLowerCase();
    let filas = Array.from(cassetteTableBody.children);
    // Recorrer todas las filas
    filas.forEach(fila => {
        let clave = fila.cells[3].textContent.trim().toLowerCase(); 

        if (filtro === "") {
            fila.style.display = "";
        } else {
            fila.style.display = clave === filtro ? "" : "none"; 
        }
    });
};

// Asignar evento al input para filtrar en tiempo real
claveCassette.addEventListener("input", filtrarPorClave);
// Asignar evento al select para filtrar por organo
ordenarFechaBtn.removeEventListener("click", () => ordenarTabla(0));
ordenarDescripcionBtn.removeEventListener("click", () => ordenarTabla(1));
ordenarOrganoBtn.removeEventListener("click", () => ordenarTabla(2));
ordenarClaveBtn.removeEventListener("click", () => ordenarTabla(3));
// Asignar evento al botón para ordenar por fecha
ordenarFechaBtn.addEventListener("click", () => ordenarTabla(0));
ordenarDescripcionBtn.addEventListener("click", () => ordenarTabla(1));
ordenarOrganoBtn.addEventListener("click", () => ordenarTabla(2));
ordenarClaveBtn.addEventListener("click", () => ordenarTabla(3));
// Asignar evento al select para filtrar por organo
filtrarOrgano.removeEventListener("change", filtrarPorOrgano);
fechaInicio.removeEventListener("change", filtrarPorFecha);
fechaFin.removeEventListener("change", filtrarPorFecha);
claveCassette.removeEventListener("change", filtrarPorClave);
// Asignar evento al select para filtar por organo
filtrarOrgano.addEventListener("change", filtrarPorOrgano);
fechaInicio.addEventListener("change", filtrarPorFecha);
fechaFin.addEventListener("change", filtrarPorFecha);
claveCassette.removeEventListener("change", filtrarPorClave);

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
    filtrarClave.value = "";
};

// Función para el botón de aministrador
const mostrarBotonAdministrar = () => {
    let rol = JSON.parse(sessionStorage.getItem('usuarioLoggeado')).rol;
    if(rol != 'A'){
        botonAdministrar.classList.add('hidden');
    }else {
        botonAdministrar.classList.remove('hidden');
    }
}

// Listener mostrar sin filtros
btnListarTodo.addEventListener("click", listarTodosLosCassettes);
document.addEventListener('DOMContentLoaded', mostrarBotonAdministrar);
btnCerrarSesion.addEventListener('click',cerrarSession);

