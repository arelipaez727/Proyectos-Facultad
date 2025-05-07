/* Esto siempre es igual*/

import express from "express";
import sequelize from "./db.js";
import cors from "cors";
import Libro from "./models/Libro.js";
import { Op } from "sequelize";



const app = express();
const port = 3000; // Puerto para el backend

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite a Express leer JSON

/*Hasta aca*/


/* Hacer solo si no me dan una base de datos */
async function seedDatabase() {
    try {
        const count = await Libro.count();
        if (count === 0) {
            console.log('Base de datos de libros vacía. Insertando datos iniciales...');
            const librosIniciales = [
                {
                    titulo: "Cien Años de Soledad",
                    autor: "Gabriel García Márquez",
                    anioPublicacion: 1967,
                    
                },
                {
                    titulo: "1984",
                    autor: "George Orwell",
                    anioPublicacion: 1949,
                    
                },
                {
                    titulo: "Don Quijote de la Mancha",
                    autor: "Miguel de Cervantes",
                    anioPublicacion: 1605,
                    
                },
                {
                    titulo: "Orgullo y Prejuicio",
                    autor: "Jane Austen",
                    anioPublicacion: 1813,
                    
                },
                {
                    titulo: "Matar a un Ruiseñor",
                    autor: "Harper Lee",
                    anioPublicacion: 1960,
                    
                },
                {
                    titulo: "El Gran Gatsby",
                    autor: "F. Scott Fitzgerald",
                    anioPublicacion: 1925,
                    
                },
                {
                    titulo: "Crimen y Castigo",
                    autor: "Fiódor Dostoyevski",
                    anioPublicacion: 1866,
                    
                },
                {
                    titulo: "La Odisea",
                    autor: "Homero",
                    anioPublicacion: -800,
                    
                },
                {
                    titulo: "Ulises",
                    autor: "James Joyce",
                    anioPublicacion: 1922,
                    
                },
                {
                    titulo: "En Busca del Tiempo Perdido",
                    autor: "Marcel Proust",
                    anioPublicacion: 1913,
                    
                },
                {
                    titulo: "El Señor de los Anillos",
                    autor: "J.R.R. Tolkien",
                    anioPublicacion: 1954,
                    
                },
                {
                    titulo: "Las Aventuras de Huckleberry Finn",
                    autor: "Mark Twain",
                    anioPublicacion: 1884,
                    
                },
                {
                    titulo: "El Principito",
                    autor: "Antoine de Saint-Exupéry",
                    anioPublicacion: 1943,
                    
                }
            ];
            await Libro.bulkCreate(librosIniciales);
            console.log('Datos iniciales insertados correctamente.');
        }
    } catch (error) {
        console.error('Error al insertar datos iniciales:', error);
    }
}
/*Hasta aca hacer si no me dan una base de datos*/


/*Lo siguiente siempre es igual, cambiar solo lo que corresponde al ejercicio
SIRVE PARA BUSCAR EN GOOGLE*/

//GET /api/libros: Obtener todos los libros. 
//GET /api/libros?search=[term]: Obtener libros filtrados únicamente por el término de búsqueda en el Titulo. 
app.get("/api/libros", async (req, res) => {
    const { search } = req.query;   
    const whereClause = search ? {
        titulo: {
            [Op.like]: `%${search}%` // Búsqueda insensible a mayúsculas/minúsculas
        },
    } : {};
    try {
        const libros = await Libro.findAll({
            where: whereClause,
            
        });
        if (libros.length === 0) {
            return res.status(404).json({ message: "No se encontraron libros" });
        }
        const librosRows = libros.map(libro => ({
            idLibro: libro.idLibro,
            titulo: libro.titulo,
            autor: libro.autor,
            anioPublicacion: libro.anioPublicacion,
        }));
        res.json(librosRows);
    } catch (error) {
        console.error("Error al obtener libros:", error);
        res.status(500).json({ error: "Error al obtener libros" });
    }
});


//DELETE /api/libros/:id: Eliminar un libro específico por su IdLibro. 
app.delete("/api/libros/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const libro = await Libro.findByPk(id);

        if (!libro) {
            return res.status(404).json({ error: "libro no encontrado" });
        }

        await libro.destroy();
        res.status(200).json({ mensaje: "libro eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar libro:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


(async function main() {
    try {
        await sequelize.authenticate();
        console.log("✔ Conexión establecida con la base de datos");
        await sequelize.sync({ force: true }); // o { alter: true }
console.log('Base de datos sincronizada.');
        console.log('Base de datos sincronizada.');
        return seedDatabase(); // Cargar datos después de sincronizar
    }
    catch (error) {
        console.error("❌ Error al conectar con la base de datos:", error);
        process.exit(1); // Salir del proceso si no se puede conectar
    }

}());

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});


/* Esto siempre es igual*/