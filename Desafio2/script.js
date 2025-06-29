const fs = require('fs');

// Clase Persona para representar cada registro
class Persona {
    constructor(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

// Función principal
function procesarPersonas() {
    try {
        // Leer y parsear el archivo JSON
        const data = fs.readFileSync('personas.json', 'utf8');
        const personasData = JSON.parse(data);
        
        // Crear colección de objetos Persona
        const personas = personasData.map(p => new Persona(p.nombre, p.apellido, p.edad));
        
        // 1. Calcular el promedio entero de las edades
        const promedioEdades = Math.round(
            personas.reduce((sum, p) => sum + p.edad, 0) / personas.length
        );
        console.log(`1. Promedio de edades: ${promedioEdades}`);
        
        // 2. Persona más joven (primera si hay empate)
        const masJoven = personas.reduce((min, p) => p.edad < min.edad ? p : min);
        console.log(`2. Persona más joven: ${masJoven.nombre} ${masJoven.apellido}`);
        
        // 3. Nombres de personas con apellido GOMEZ, ordenados alfabéticamente
        const gomez = personas
            .filter(p => p.apellido === 'GOMEZ')
            .map(p => p.nombre)
            .sort((a, b) => a.localeCompare(b));
        console.log(`3. Nombres de personas GOMEZ: ${gomez.join(', ')}`);
        
        // 4. Suma de edades donde longitud nombre es par y apellido impar
        const sumaEdades = personas
            .filter(p => p.nombre.length % 2 === 0 && p.apellido.length % 2 !== 0)
            .reduce((sum, p) => sum + p.edad, 0);
        console.log(`4. Suma de edades con condiciones: ${sumaEdades}`);
        
        // 5. Objeto JSON con estadísticas
        const estadisticas = {
            mayores: personas.filter(p => p.edad > 18).length,
            menores: personas.filter(p => p.edad <= 18).length,
            primeraMitad: personas.filter(p => /^[A-L]/i.test(p.apellido)).length,
            segundaMitad: personas.filter(p => /^[M-Z]/i.test(p.apellido)).length
        };
        console.log('5. Estadísticas:');
        console.log(JSON.stringify(estadisticas, null, 2));
        
        // 6. Objeto JSON con conteo de apellidos específicos
        const apellidos = ['CASTILLO', 'DIAZ', 'FERRER', 'PINO', 'ROMERO'];
        const conteoApellidos = {};
        apellidos.forEach(a => {
            conteoApellidos[a] = personas.filter(p => p.apellido === a).length;
        });
        console.log('6. Conteo de apellidos:');
        console.log(JSON.stringify(conteoApellidos, null, 2));
        
    } catch (error) {
        console.error('Error al procesar el archivo:', error);
    }
}

// Ejecutar el programa
procesarPersonas();