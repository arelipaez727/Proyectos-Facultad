import { readFile } from "fs/promises";

// Función para leer el archivo JSON y devolverlo como array de objetos
function readJSON(file) {
  return readFile(file, "utf8").then((data) => JSON.parse(data));
}

(async function main() {
  try {
    const data = await readJSON("./data/tbbt.json");

    // 1. Construir un mapa de mapas: Map<temporada, Map<nro_episodio, episodio>>
    const mapTbbt = new Map();
    data.forEach((element) => {
      mapTbbt.has(element.season)
        ? mapTbbt.get(element.season).set(element.episode_num, element)
        : mapTbbt.set(
            element.season,
            new Map([[element.episode_num, element]])
          );
    });

    // A partir del mapa construido, resolver los siguientes puntos:

    // 1. Listar los títulos de todos los episodios de la temporada 1
    console.log("Episodios de la temporada 1: ");
    const temporada1 = mapTbbt.get("1");
    if (temporada1) {temporada1.forEach(episodio => {console.log(episodio.title);})}
    else {console.log("No hay episodios en la temporada 1");}



    // 2. Mostrar el título del episodio 22 de la temporada 3

    const temporada3 = mapTbbt.get("3");
    if (temporada3) {temporada3.forEach(episodio => {if (episodio.episode_num === "22") {console.log("Título del episodio 22: ", episodio.title)}})}
    else {"No existe la temporada 3"}


    // 3. Calcular y mostrar el promedio de rating de la temporada 3
    const episodiosTemporada3 = mapTbbt.get("3");
    if (episodiosTemporada3) {let suma = 0; let contador = 0;
     
        
    episodiosTemporada3.forEach(episodio => {suma += parseFloat(episodio.imdb_rating); contador++;});
    
    const promedio = suma/contador;
    console.log("Promedio de rating de la temporada 3: ", promedio);} 
    else {console.log("No hay episodios en la temporada 3");}

  } catch (error) {
    console.error("Error al consumir el archivo JSON:", error);
  }
})();