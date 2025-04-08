let autosAgencia = [
    { marca: 'Renault', modelo: 'Sandero', anio: 2022, precio: 19000000 },
    { marca: 'Chevrolet', modelo: 'Cruze', anio: 2019, precio: 23000000 },
    { marca: 'Citroen', modelo: 'C3', anio: 2021, precio: 17000000 },
    { marca: 'Fiat', modelo: 'Cronos', anio: 2023, precio: 21500000 }
];

function mostrarAutos() {
    const tablaBody = document.getElementById('tablaAutosBody');
    tablaBody.innerHTML = '';
