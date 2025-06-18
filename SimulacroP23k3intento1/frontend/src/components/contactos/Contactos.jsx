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
  const [Activo, setActivo] = useState(true);
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
    const data = await contactosService.Buscar(Nombre, true);
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

  function Modificar(item) {
    if (!item.Activo) {
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M");
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdContacto: 0,
      Nombre: "",
      Apellido: "",
      Telefono: "",
      Email: "",
      FechaNacimiento: moment(new Date()).format("DD/MM/YYYY"),
      Direccion: "",
      Salario: "0.00",
      Activo: true,
    });
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "¿Está seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await contactosService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    try {
      // Formatear salario a 2 decimales
      if (item.Salario) {
        item.Salario = parseFloat(item.Salario).toFixed(2);
      }
      
      // Convertir fecha al formato esperado por el backend (YYYY-MM-DD)
      if (item.FechaNacimiento) {
        item.FechaNacimiento = moment(item.FechaNacimiento, "DD/MM/YYYY").format("YYYY-MM-DD");
      }
      
      await contactosService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString());
      return;
    }
    
    await Buscar();
    Volver();

    setTimeout(() => {
      modalDialogService.Alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
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