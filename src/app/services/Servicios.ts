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

  public static async Registra(data: any) {
    return await post("Registra", data);
  }

  public static async BitacoraSingle(data: any) {
    return await post("BitacoraSingle", data);
  }

  public static async Bitacorafull(data: any) {
    return await post("Bitacorafull", data);
  }

  public static async totalincidencias(data: any) {
    return await post("totalincidencias", data);
  }

  public static async Incidenciasporfecha(data: any) {
    return await post("Incidenciasporfecha", data);
  }
}
