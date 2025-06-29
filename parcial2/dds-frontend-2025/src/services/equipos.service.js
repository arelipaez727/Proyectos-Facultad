import httpService from "./http.service";

// Puedes usar cualquiera de estas opciones para la URL base
// const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2025/api/equiposf1";
const urlResource = "http://localhost:3000/api/equiposf1";
// const urlResource = "https://pymes2025.azurewebsites.net/api/equiposf1";

async function Buscar(NombreCorredor) {
  const resp = await httpService.get(urlResource, {
    params: { NombreCorredor },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdEquipo);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdEquipo);
}

async function Grabar(item) {
  if (!item.IdEquipo || item.IdEquipo === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdEquipo, item);
  }
}

export const equiposf1Service = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar
};