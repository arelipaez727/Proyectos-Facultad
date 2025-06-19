import React from "react";


function Equiposf1Buscar({ Nombre, setNombre, Buscar, Agregar }) {
    return (
      <form name="FormBusqueda" onSubmit={(e) => e.preventDefault()}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4 col-md-2">
              <label className="col-form-label">Nombre del Corredor:</label>
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

export {Equiposf1Buscar};