// ObrasListado.jsx
import React from "react";
import moment from "moment";

export default function ObrasListado({ items }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Id Obra</th>
            <th className="text-center">Título</th>
            <th className="text-center">Artista</th>
            <th className="text-center">Fecha Ingreso</th>
            <th className="text-center">Valor Estimado ($)</th>
            <th className="text-center">En Exhibición</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((Item) => (
              <tr key={Item.IdObra}>
                <td className="text-center">{Item.IdObra}</td>
                <td>{Item.Titulo}</td>
                <td>{Item.Artista}</td>
                <td className="text-end">
                  {Item.FechaIngreso
                    ? moment(Item.FechaIngreso).format("DD/MM/YYYY")
                    : ""}
                </td>
                <td className="text-end">
                  ${Item.ValorEstimadoPesos.toFixed(2)}
                </td>
                <td className="text-center">
                  {Item.EnExhibicion ? "Sí" : "No"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}