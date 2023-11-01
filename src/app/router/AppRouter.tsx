import { Route, Routes } from "react-router-dom";
import { Bienvenido } from "../views/Bienvenido";
import Inicio from "../views/Inicio";
import { Bitacora } from "../views/layers/bitacora/Bitacora";
import { Escaner } from "../views/layers/escaner/Escaner";

export const AppRouter = () => {
  return (
    <>
      <Inicio>
        <Routes>
          <Route path="/inicio" element={<Bienvenido />}></Route>
          <Route path="/escaner" element={<Escaner />}></Route>
          <Route path="/bitacora" element={<Bitacora />}></Route>
        </Routes>
      </Inicio>
    </>
  );
};
