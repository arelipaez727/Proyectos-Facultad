import React, { useState } from "react";
import { equiposf1Service } from "../../services/equipos.service"; // ajustá la ruta según tu estructura

import Equipof1Listado from "./Equipof1Listado";
import Equipof1Registro from "./Equipof1Registro";
import { Equiposf1Buscar } from "./Equipof1Buscar";

export default function EquiposF1() {
  const [AccionABMC, setAccionABMC] = useState("L"); // L: listado, A: alta, M: modificacion, C: consulta
  const [NombreCorredor, setNombreCorredor] = useState("");
  const [Listado, setListado] = useState([]);
  const [Item, setItem] = useState(null);
  const [BusquedaRealizada, setBusquedaRealizada] = useState(false);

  // Buscar equipos filtrando por NombreCorredor
  async function Buscar() {
    try {
      const data = await equiposf1Service.Buscar(NombreCorredor);
      setListado(data);
      setBusquedaRealizada(true);
    } catch (error) {
      console.error("Error al buscar equipos:", error);
      alert("Error al buscar equipos");
    }
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      NombreEquipo: "",
      NombreCorredor: "",
      Presupuesto: 0,
      FechaDeInicio: "",
      CampeonatosGanados: 0,
    });
  }

  function Volver() {
    setAccionABMC("L");
  }

  async function Grabar(datos) {
    try {
      await equiposf1Service.Grabar(datos);
      await Buscar();
      Volver();
    } catch (error) {
      console.error("Error al grabar equipo:", error);
      alert("Error al grabar equipo");
    }
  }

  return (
    <div className="container">
      {AccionABMC === "L" && <Equiposf1Buscar
            Nombre={NombreCorredor}
            setNombre={setNombreCorredor}
            Buscar={Buscar}
            Agregar={Agregar}
          />
      }
      {AccionABMC === "L" && Listado?.length > 0 && 
          <Equipof1Listado items={Listado} Consultar={() => {}} Modificar={() => {}} />
      }

      {AccionABMC === "L" && BusquedaRealizada && Listado?.length === 0 && 
        <div className="alert alert-info text-center">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron equipos con ese corredor...
        </div>
      }

      {AccionABMC === "A" && (
        <Equipof1Registro
          AccionABMC={AccionABMC}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}
    </div>
  );
}

export { EquiposF1 };