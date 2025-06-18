import React from "react";
import moment from "moment";

export default function ContactosListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre y Apellido</th>
            <th className="text-center">Fecha Nacimiento</th>
            <th className="text-center">Teléfono</th>
            <th className="text-center">IdCategoria</th>
            <th className="text-end">ImporteContribucion</th>
            <th className="text-center">Activo</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdContacto}>
                <td>{Item.Nombre}</td>
                <td className="text-center">
                  {Item.FechaNacimiento ? moment(Item.FechaNacimiento).format("DD/MM/YYYY") : ""}
                </td>
                <td>{Item.Telefono}</td>
                <td className="text-center">{Item.IdCategoria}</td>
                <td className="text-end">{parseFloat(Item.ImporteContribucion || 0).toFixed(2)}</td>
                <td className="text-center">{Item.Activo ? "SI" : "NO"}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary me-1"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary me-1"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={
                      "btn btn-sm " +
                      (Item.Activo
                        ? "btn-outline-danger"
                        : "btn-outline-success")
                    }
                    title={Item.Activo ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Item)}
                  >
                    <i
                      className={"fa fa-" + (Item.Activo ? "times" : "check")}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}