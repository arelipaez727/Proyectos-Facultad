import { createReadStream } from "fs";
import csv from "csv-parser";

// Función para leer archivo CSV y devolver una promesa con el resultado
function readCSV(file) {
  return new Promise((resolve, reject) => {
    const results = [];
    try {
      createReadStream(file)
        .on("error", (error) => reject(error))
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results));
    } catch (error) {
      reject(error);
    }
  });
}

// Función principal autoinvocada
(async function main() {
  try {
    const data = await readCSV("./data/tbbt.csv");

    // 📋 A partir del array 'data', resolver:

    // 1. Listar los títulos de todos los episodios de la temporada 1
    /*Creamos el arreglo con los episodios que son de la temporada 1 */
    const temporada1 = data.filter(episodio => episodio.season === "1");
    /*Recorremos el arreglo y mostramos los títulos de los episodios*/
    console.log("Episodios de la Temporada 1:");
    temporada1.forEach(episodio => {
      console.log(`- ${episodio.title}`);
    });


    // 2. Mostrar el título del episodio 22 de la temporada 3

    const episodio22Temporada3 = data.find(episodio => episodio.season ==="3" && episodio.episode_num === "22")
    /*El método find devuelve el primer elemento que cumple con la condición, en este caso el episodio 22 de la temporada 3*/
    if (episodio22Temporada3 !== undefined) {console.log("Título del episodio 22 de la temporada 3: ",episodio22Temporada3.title)}
    else {console.log("Episodio no encontrado")}

    // 3. Calcular y mostrar el promedio de rating de la temporada 3

    const filtro = data.filter(episodio => episodio.season === "3")
    const suma = filtro.reduce((suma, episodio) => suma +  parseFloat(episodio.imdb_rating), 0);
    if (filtro.length === 0) {console.log("No hay episodios en la temporada 3")}
    else {console.log("Promedio de rating de la temporada 3: ", suma/filtro.length);}
    


  } catch (error) {
    console.error("Error al leer archivo CSV:", error);
  }
})();