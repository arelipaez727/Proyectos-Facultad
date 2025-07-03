//obras.service.js
import httpService from "./http.service";

// Podés usar cualquiera de estas URLs base según el entorno:
const urlResource = "http://localhost:3000/api/obra";
// const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2025/api/obra";
// const urlResource = "https://pymes2025.azurewebsites.net/api/obras";

// Buscar obras por artista (coincidencia parcial)
async function Buscar(Artista) {
  const resp = await httpService.get(urlResource, {
    params: { Artista },
  });
  return resp.data.Items;
}

// Buscar obra por ID (no requerido actualmente, pero útil si se extiende)
async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdObra);
  return resp.data;
}

// Activar o desactivar (no usado, pero respetamos el formato del ejemplo)
async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdObra);
}

// Crear o modificar obra (no requerido ahora, pero futuro CRUD)
async function Grabar(item) {
  if (!item.IdObra || item.IdObra === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdObra, item);
  }
}

export const obrasService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};