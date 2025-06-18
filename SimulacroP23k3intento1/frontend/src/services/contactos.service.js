import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2025/api/contactos";
const urlResource = "http://localhost:3000/api/contactos";
//const urlResource = "https://pymes2025.azurewebsites.net/api/contactos";
// mas adelante podemos usar un archivo de configuracion para el urlResource
// import {config} from "../config";
// const urlResource = config.urlResourceContactos;

async function Buscar(Nombre, Activo) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo }
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdContacto);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdContacto);
}

async function Grabar(item) {
  if (!item.IdContacto || item.IdContacto === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdContacto, item);
  }
}

export const contactosService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar
};