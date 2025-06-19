import React from "react";
import moment from "moment";

export default function Equipof1Listado({
  items,
  Consultar,
  Modificar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre Equipo</th>
            <th className="text-center">Nombre Corredor</th>
            <th className="text-center">Presupuesto</th>
            <th className="text-center">Fecha Inicio</th>
            <th className="text-center">Campeonatos Ganados</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((Item) => (
              <tr key={Item.IdEquipo}>
                <td>{Item.NombreEquipo}</td>
                <td>{Item.NombreCorredor}</td>
                <td className="text-end">${Item.Presupuesto.toFixed(2)}</td>
                <td className="text-end">
                  {Item.FechaDeInicio ? moment(Item.FechaDeInicio).format("DD/MM/YYYY") : ""}
                </td>
                <td className="text-center">{Item.CampeonatosGanados}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}