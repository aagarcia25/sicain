import { Navigate, Route, Routes } from "react-router-dom";
import { Bienvenido } from "../views/Bienvenido";
import Inicio from "../views/Inicio";
import { Bitacora } from "../views/layers/bitacora/Bitacora";
import { Escaner } from "../views/layers/escaner/Escaner";
import Incidencias from "../views/layers/incidencias/Incidencias";
import { getItem } from "../services/localStorage";
import { loadRol } from "../hook/roles";
import { Usuarios } from "../views/layers/usuarios/usuarios";
import ChangePassword from "../views/share/changePassword";
import { desencrypta } from "../helpers/cifrado";

export const AppRouter = () => {
  loadRol();
  let flag;
  let user;
  try {
    flag = getItem("l1");
    user = JSON.parse(desencrypta(JSON.parse(String(getItem("l2"))))) as any;
  } catch (error) {
    console.error("Error al procesar los datos:", error);
  }
  return (
    <>
      <Inicio>
        <Routes>
          <Route
            path="/sicain/inicio"
            element={flag ? <Bienvenido /> : <Navigate to="/sicain" replace />}
          ></Route>
          <Route
            path="/sicain/escaner"
            element={flag ? <Escaner /> : <Navigate to="/sicain" replace />}
          ></Route>
          <Route
            path="/sicain/bitacora"
            element={flag ? <Bitacora /> : <Navigate to="/sicain" replace />}
          ></Route>
          <Route
            path="/sicain/incidencia"
            element={flag ? <Incidencias /> : <Navigate to="/sicain" replace />}
          ></Route>
          <Route
            path="/sicain/usuarios"
            element={flag ? <Usuarios /> : <Navigate to="/sicain" replace />}
          ></Route>
          <Route
            path="/sicain/cp"
            element={
              flag ? (
                <ChangePassword usuario={user} />
              ) : (
                <Navigate to="/sicain" replace />
              )
            }
          ></Route>
        </Routes>
      </Inicio>
    </>
  );
};
