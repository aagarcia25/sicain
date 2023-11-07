import { post, postDoc } from "./apiServiceExt";

export class Servicios {
  public static async login(data: any) {
    return await post("login", data);
  }

  public static async Escaner(data: any) {
    return await post("Escaner", data);
  }
  public static async obtenerDoc(data: any) {
    return await postDoc("obtenerDoc", data);
  }

  public static async Bitacora(data: any) {
    return await post("Bitacora", data);
  }

  public static async incidencia(data: any) {
    return await post("incidencia", data);
  }

  public static async incidenciaList(data: any) {
    return await post("incidenciaList", data);
  }
}
