import React, { useState } from "react";
import { contratosService } from "../../services/contratos.service"; // ajustá la ruta según tu estructura

import ContratoListados from "./ContratoListados";
import ContratoRegistro from "./ContratoRegistro";


export default function Contrato() {
  const [AccionABMC, setAccionABMC] = useState("L"); // L: listado, A: alta, M: modificacion, C: consulta
  const [NombreContrato, setNombreContrato] = useState("");
  const [Listado, setListado] = useState([]);
  const [Item, setItem] = useState(null);
  const [BusquedaRealizada, setBusquedaRealizada] = useState(false);


  // Buscar contratos filtrando por NombreContrato
  async function Buscar() {
    try {
      const data = await contratosService.Buscar(NombreContrato);
      setListado(data);
      setBusquedaRealizada(true);
    } catch (error) {
      console.error("Error al buscar contratos:", error);
      alert("Error al buscar contratos");
    }
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      NombreContrato: "",
      ImporteMensual: 0,
      TelefonoContacto: "",
      FechaInicio: "",
      FechaFin: "",
      Activo: true,
    });
  }

  function Volver() {
    setAccionABMC("L");
  }

  async function Grabar(datos) {
    try {
      await contratosService.Grabar(datos);
      await Buscar();
      Volver();
    } catch (error) {
      console.error("Error al grabar contrato:", error);
      alert("Error al grabar contrato");
    }
  }

  function ContratoBuscar({ Nombre, setNombre, Buscar, Agregar }) {
    return (
      <form name="FormBusqueda" onSubmit={(e) => e.preventDefault()}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4 col-md-2">
              <label className="col-form-label">NombreContrato:</label>
            </div>
            <div className="col-sm-8 col-md-4">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setNombre(e.target.value)}
                value={Nombre}
                maxLength="70"
                autoFocus
              />
            </div>
          </div>
          <hr />
          {/* Botones */}
          <div className="row">
            <div className="col text-center botones">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => Buscar()}
              >
                <i className="fa fa-search"> </i> Buscar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => Agregar()}
              >
                <i className="fa fa-plus"> </i> Agregar
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="container">
      {AccionABMC === "L" && <ContratoBuscar
            Nombre={NombreContrato}
            setNombre={setNombreContrato}
            Buscar={Buscar}
            Agregar={Agregar}
          />
      }
      {AccionABMC === "L" && Listado?.length > 0 && 
          <ContratoListados items={Listado} Consultar={() => {}} Modificar={() => {}} />
      }

      {AccionABMC === "L" && BusquedaRealizada && Listado?.length === 0 && 
        <div className="alert alert-info text-center">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron contratos con ese nombre...
        </div>
      }

      {AccionABMC === "A" && (
        <ContratoRegistro
          AccionABMC={AccionABMC}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}
    </div>
  );
}
export {Contrato};