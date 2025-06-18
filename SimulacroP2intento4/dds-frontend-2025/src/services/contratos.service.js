import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2025/api/contratos";
const urlResource = "http://localhost:3000/api/contratos";
//const urlResource = "https://pymes2025.azurewebsites.net/api/contratos";
// mas adelante podemos usar un archivo de configuracion para el urlResource
// import {config} from "../config";
// const urlResource = config.urlResourceContratos;

async function Buscar(NombreContrato) {
  const resp = await httpService.get(urlResource, {
    params: { NombreContrato },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdContrato);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdContrato);
}

async function Grabar(item) {
  if (!item.IdContrato || item.IdContrato === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdContrato, item);
  }
}

export const contratosService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar
};