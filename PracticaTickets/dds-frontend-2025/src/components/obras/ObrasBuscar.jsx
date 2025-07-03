// ObrasBuscar.jsx
import React from "react";

export default function ObrasBuscar({ Nombre, setNombre, Buscar }) {
  return (
    <form name="FormBusqueda" onSubmit={(e) => e.preventDefault()}>
      <div className="container-fluid">
        {/* Campo de texto */}
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Artista:</label>
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
        {/* Botón Buscar */}
        <div className="row">
          <div className="col text-center botones">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => Buscar()}
            >
              <i className="fa fa-search"> </i> Buscar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}