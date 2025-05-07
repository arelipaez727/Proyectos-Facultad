/*Aca es siempre igual*/

document.addEventListener('DOMContentLoaded', () => {
    //Carga los libros al iniciar la pagina
    cargarLibros();
    //Añade un "listener" al botón con ID searchBtn para que responda al evento click.
    document.getElementById("filtrarBtn").addEventListener("click", (e) => {
        e.preventDefault(); // Para evitar que se recargue el formulario
        //Vuelve a ejecutar la función cargarLibros() cuando se hace clic en el botón, con nuevos criterios.
        cargarLibros();
    });
});


async function cargarLibros(){
    //window.alert("Completar código.....")
    try {
        const searchValue = document.getElementById("searchInput").value.trim();
        let API_URL = 'http://localhost:3000/api/libros'; // URL de la API de libros
        if (searchValue) {
            // Agregar query param si hay texto
            API_URL += `?search=${encodeURIComponent(searchValue)}`;
        }
        const response = await fetch(API_URL); // Realizar la solicitud a la API
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const libros = await response.json(); // Convertir la respuesta a JSON
        const tabla = document.getElementById("booksTable");

        // Limpiar la tabla actual
        tabla.innerHTML = "";
        //Muestra cada estacion en la tabla
        libros.forEach((libro) => {
            //Crea una nueva fila para cada estacion
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${libro.idLibro}</td>
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.anioPublicacion}</td>
                <td> <button class="btn btn-danger btn-sm" onclick="eliminarlibro(${libro.idLibro})">Eliminar</button></td>
            `;

            tabla.appendChild(tr);
        });
        console.log(libros); // Mostrar los libros en la consola
    } catch (error) {
        console.error('Error al obtener libros:', error);
    }
}

async function eliminarlibro(id) {
    const confirmar = confirm("¿Estás seguro que deseas eliminar este libro?");
    if (!confirmar) return;

    try {
        const response = await fetch(`http://localhost:3000/api/libros/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Error al eliminar libro");
        }

        alert("Libro eliminado correctamente");
        cargarLibros(); // Actualiza la tabla
    } catch (error) {
        console.error("Error al eliminar libro:", error);
    }
}

