import React, { useState, useEffect } from "react";
import moment from "moment";
import ContactosBuscar from "./ContactosBuscar";
import ContactosListado from "./ContactosListado";
import ContactosRegistro from "./ContactosRegistro";
import { contactosService } from "../../services/contactos.service";
import modalDialogService from "../../services/modalDialog.service";
import { categoriasService } from "../../services/categorias.service";

function Contactos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");
  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null);
  const [BusquedaRealizada, setBusquedaRealizada] = useState(false);
  const [Categorias, setCategorias] = useState(null);
  
    // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
    useEffect(() => {
      async function BuscarCategorias() {
        let data = await categoriasService.Buscar();
        setCategorias(data);
      }
      BuscarCategorias();
    }, []);



  async function Buscar() {
    const data = await contactosService.Buscar(Nombre, Activo);
    setItems(data.Items);
    setBusquedaRealizada(true);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await contactosService.BuscarPorId(item);
    // Formatear fechas para mostrar
    if (data.FechaNacimiento) {
      data.FechaNacimiento = moment(data.FechaNacimiento).format("DD/MM/YYYY");
    }
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C");
  }

  async function Modificar(item) {
    try {
      const data = await contactosService.BuscarPorId(item);
      setItem(data);
      setAccionABMC("M");
    } catch (error) {
      alert("Error al modificar: " + error);
    }
  }


  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdContacto: 0,
      Nombre: "",
      FechaNacimiento: "",
      Telefono: "",
      IdCategoria: "",
      ImporteContribucion: "0.00",
    });
  }

  async function ActivarDesactivar(item) {
    if (!window.confirm("¿Está seguro que desea eliminar este contacto?")) return;
    try {
      await contactosService.ActivarDesactivar(item);
      Buscar();
    } catch (error) {
      alert("Error al eliminar: " + error);
    }
  }


 async function Grabar(item) {
    try {
      await contactosService.Grabar(item);
      Volver();
      Buscar();
    } catch (error) {
      alert("Error al grabar: " + error);
    }
  }


  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Contactos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <ContactosBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {AccionABMC === "L" && Items?.length > 0 && (
        <ContactosListado
          Items={Items}
          Consultar={Consultar}
          Modificar={Modificar}
          ActivarDesactivar={ActivarDesactivar}
        />
      )}

      {AccionABMC === "L" && BusquedaRealizada && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {AccionABMC !== "L" && (
        <ContactosRegistro
          AccionABMC={AccionABMC}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
          Categorias={Categorias}
        />
      )}
    </div>
  );
}

export { Contactos };