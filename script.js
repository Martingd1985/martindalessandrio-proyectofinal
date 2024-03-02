// Definir constantes y variables globales
const formularioMantenimiento = document.getElementById('formularioMantenimiento');
const fechaMantenimientoInput = document.getElementById('fechaMantenimiento');
const tareaMantenimientoInput = document.getElementById('tareaMantenimiento');
const detallesMantenimientoInput = document.getElementById('detallesMantenimiento');
const consejosMantenimientoInput = document.getElementById('consejosMantenimiento');
const listaMantenimientos = document.getElementById('listaMantenimientos');
const agregarBtn = document.getElementById('agregarBtn');
const reiniciarBtn = document.getElementById('reiniciarBtn');
const buscarPorFechaInput = document.getElementById('fechaBusquedaInput');
const tareaBusquedaInput = document.getElementById('tareaBusquedaInput');
const buscarPorFechaBtn = document.getElementById('buscarPorFechaBtn');
const filtrarPorTareaBtn = document.getElementById('filtrarPorTareaBtn');
const restablecerFiltroBtn = document.getElementById('restablecerFiltroBtn');

let registrosMantenimiento = [];

// Definir clases y funciones
class RegistroMantenimiento {
    constructor(fecha, tarea, detalles, consejos) {
        this.fecha = fecha;
        this.tarea = tarea;
        this.detalles = detalles;
        this.consejos = consejos;
    }
}

function agregarMantenimiento() {
    const fecha = fechaMantenimientoInput.value;
    const tarea = tareaMantenimientoInput.value;
    const detalles = detallesMantenimientoInput.value;
    const consejos = consejosMantenimientoInput.value;

    if (fecha && tarea) {
        const nuevoMantenimiento = new RegistroMantenimiento(fecha, tarea, detalles, consejos);
        registrosMantenimiento.push(nuevoMantenimiento);
        mostrarListaMantenimientos();
        reiniciarFormulario();
        guardarMantenimientoEnStorage();
        mostrarGrafico(); // Llamar a la función para mostrar el gráfico después de agregar un mantenimiento
    } else {
        alert('Por favor, complete la fecha y la tarea de mantenimiento.');
    }
}

function mostrarListaMantenimientos() {
    listaMantenimientos.innerHTML = '';
    registrosMantenimiento.forEach((mantenimiento, index) => {
        const elementoLista = document.createElement('li');
        elementoLista.innerHTML = `<strong>${mantenimiento.fecha}:</strong> ${mantenimiento.tarea}<br>
                                      <em>Detalles:</em> ${mantenimiento.detalles}<br>
                                      <em>Consejos o Parámetros:</em> ${mantenimiento.consejos}`;
        listaMantenimientos.appendChild(elementoLista);
    });
}

function reiniciarFormulario() {
    formularioMantenimiento.reset();
}

function guardarMantenimientoEnStorage() {
    localStorage.setItem('mantenimientos', JSON.stringify(registrosMantenimiento));
}

function buscarMantenimientoPorFecha(fecha) {
    const mantenimientosEncontrados = registrosMantenimiento.filter(mantenimiento => mantenimiento.fecha === fecha);
    if (mantenimientosEncontrados.length > 0) {
        console.log(`Se encontraron mantenimientos para la fecha "${fecha}":`);
        mantenimientosEncontrados.forEach(mantenimiento => console.log(`- ${mantenimiento.fecha}: ${mantenimiento.tarea}`));
        // Mostrar los resultados encontrados
        listaMantenimientos.innerHTML = '';
        mantenimientosEncontrados.forEach(mantenimiento => {
            const elementoLista = document.createElement('li');
            elementoLista.innerHTML = `<strong>${mantenimiento.fecha}:</strong> ${mantenimiento.tarea}<br>
                                          <em>Detalles:</em> ${mantenimiento.detalles}<br>
                                          <em>Consejos o Parámetros:</em> ${mantenimiento.consejos}`;
            listaMantenimientos.appendChild(elementoLista);
        });
    } else {
        console.log(`No se encontraron mantenimientos para la fecha "${fecha}"`);
    }
}

function filtrarMantenimientosPorTarea(tarea) {
    const mantenimientosFiltrados = registrosMantenimiento.filter(mantenimiento => mantenimiento.tarea.includes(tarea));
    if (mantenimientosFiltrados.length > 0) {
        console.log(`Se encontraron ${mantenimientosFiltrados.length} mantenimientos para la tarea "${tarea}":`);
        mantenimientosFiltrados.forEach(mantenimiento => console.log(`- ${mantenimiento.fecha}: ${mantenimiento.tarea}`));
        // Mostrar los resultados encontrados
        listaMantenimientos.innerHTML = '';
        mantenimientosFiltrados.forEach(mantenimiento => {
            const elementoLista = document.createElement('li');
            elementoLista.innerHTML = `<strong>${mantenimiento.fecha}:</strong> ${mantenimiento.tarea}<br>
                                          <em>Detalles:</em> ${mantenimiento.detalles}<br>
                                          <em>Consejos o Parámetros:</em> ${mantenimiento.consejos}`;
            listaMantenimientos.appendChild(elementoLista);
        });
    } else {
        console.log(`No se encontraron mantenimientos para la tarea "${tarea}"`);
    }
}

function restablecerFiltro() {
    mostrarListaMantenimientos();
}

function mostrarGrafico() {
    // Crear un gráfico de ejemplo con Chart.js
    const ctx = document.getElementById('graficoBarras').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
            datasets: [{
                label: 'Cantidad de mantenimientos por mes',
                data: [12, 19, 3, 5, 2, 3], // Datos de ejemplo, reemplaza con tus propios datos
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Cargar datos desde un archivo JSON local usando fetch y promesas
function cargarDatosDesdeJSON() {
    return fetch('datos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos desde el archivo JSON.');
            }
            return response.json();
        })
        .then(data => {
            registrosMantenimiento = data.map(item => new RegistroMantenimiento(item.fecha, item.tarea, item.detalles, item.consejos));
            mostrarListaMantenimientos();
            mostrarGrafico(); // Llamar a la función para mostrar el gráfico después de cargar los datos
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Llamar a la función para cargar datos al cargar la página
document.addEventListener('DOMContentLoaded', cargarDatosDesdeJSON);

// Event listeners
agregarBtn.addEventListener('click', agregarMantenimiento);
reiniciarBtn.addEventListener('click', reiniciarFormulario);
buscarPorFechaBtn.addEventListener('click', () => {
    const fecha = buscarPorFechaInput.value;
    if (fecha) {
        buscarMantenimientoPorFecha(fecha);
    } else {
        alert('Por favor, ingrese una fecha para buscar.');
    }
});
filtrarPorTareaBtn.addEventListener('click', () => {
    const tarea = tareaBusquedaInput.value;
    if (tarea) {
        filtrarMantenimientosPorTarea(tarea);
    } else {
        alert('Por favor, ingrese una tarea para filtrar.');
    }
});
restablecerFiltroBtn.addEventListener('click', restablecerFiltro);
