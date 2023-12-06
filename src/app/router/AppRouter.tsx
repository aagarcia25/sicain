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
  const flag = getItem("l1");

  const user = JSON.parse(
    desencrypta(JSON.parse(String(getItem("l2"))))
  ) as any;
  return (
    <>
      <Inicio>
        <Routes>
          <Route
            path="/inicio"
            element={flag ? <Bienvenido /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/escaner"
            element={flag ? <Escaner /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/bitacora"
            element={flag ? <Bitacora /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/incidencia"
            element={flag ? <Incidencias /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/usuarios"
            element={flag ? <Usuarios /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/cp"
            element={
              flag ? (
                <ChangePassword usuario={user} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          ></Route>
        </Routes>
      </Inicio>
    </>
  );
};
