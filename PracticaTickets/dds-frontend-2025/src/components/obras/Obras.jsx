// Obras.jsx
import React, { useState, useEffect } from "react";
import { obrasService } from "../../services/obras.service"; // ajustá la ruta según tu estructura

import ObrasListado from "./ObrasListado";
import ObrasBuscar from "./ObrasBuscar";

export default function Obras() {
  const [AccionABMC, setAccionABMC] = useState("L"); // L: listado
  const [NombreArtista, setNombreArtista] = useState("");
  const [Listado, setListado] = useState([]);
  const [BusquedaRealizada, setBusquedaRealizada] = useState(false);

  // Buscar obras filtrando por NombreArtista
  async function Buscar() {
    try {
      const data = await obrasService.Buscar(NombreArtista);
      // Ordenar por FechaIngreso ascendente
      const ordenado = data.sort((a, b) => new Date(a.FechaIngreso) - new Date(b.FechaIngreso));
      setListado(ordenado);
      setBusquedaRealizada(true);
    } catch (error) {
      console.error("Error al buscar obras:", error);
      alert("Error al buscar obras");
    }
  }

  // Cargar listado al iniciar
  useEffect(() => {
    Buscar();
  }, []);

  return (
    <div className="container">
      {AccionABMC === "L" && (
        <ObrasBuscar
          Nombre={NombreArtista}
          setNombre={setNombreArtista}
          Buscar={Buscar}
        />
      )}

      {AccionABMC === "L" && Listado?.length > 0 && (
        <ObrasListado items={Listado} />
      )}

      {AccionABMC === "L" && BusquedaRealizada && Listado?.length === 0 && (
        <div className="alert alert-info text-center">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron obras del artista ingresado...
        </div>
      )}
    </div>
  );
}