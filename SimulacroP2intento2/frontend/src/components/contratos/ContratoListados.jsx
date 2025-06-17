import React from "react";
import moment from "moment";

export default function ContratosListado({
  items,
  Consultar,
  Modificar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre Contrato</th>
            <th className="text-center">Importe Mensual</th>
            <th className="text-center">Teléfono Contacto</th>
            <th className="text-center">Fecha Inicio</th>
            <th className="text-center">Fecha Fin</th>
            {/* <th className="text-center text-nowrap">Acciones</th> */} {/* Eliminado */}
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((Item) => (
              <tr key={Item.IdContrato}>
                <td>{Item.NombreContrato}</td>
                <td className="text-end">{Item.ImporteMensual}</td>
                <td className="text-end">{Item.TelefonoContacto}</td>
                <td className="text-end">
                  {Item.FechaInicio ? moment(Item.FechaInicio).format("DD/MM/YYYY") : ""}
                </td>
                <td className="text-end">
                  {Item.FechaFin ? moment(Item.FechaFin).format("DD/MM/YYYY") : ""}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
