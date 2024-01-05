import { useEffect } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "./app/router/AppRouter";
import { Plogin } from "./app/views/Plogin";
import {Helmet} from "react-helmet";

function App() {
  /* useEffect(() => {
    // Redirección de HTTP a HTTPS
    if (
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost"
    ) {
      window.location.href =
        "https://" + window.location.hostname + window.location.pathname;
    }

    const handleBeforeUnload = (event: any) => {
      const message = "¿Estás seguro de que deseas salir?";
      event.returnValue = message; // Estándar para la mayoría de los navegadores
      return message; // Necesario para algunos navegadores más antiguos
    };

    if (window.location.hostname !== "localhost") {
      const bloquearClickDerecho = (e: MouseEvent) => {
        e.preventDefault();
      };
      // Agregar el escucha de evento para el click derecho en el montaje del componente

      window.addEventListener("contextmenu", bloquearClickDerecho);
      window.addEventListener("beforeunload", handleBeforeUnload);
      // Remover el escucha de evento cuando el componente se desmonta
      return () => {
        window.removeEventListener("contextmenu", bloquearClickDerecho);
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);*/

  return (
    <div>
     <Helmet>
        {/* Configuración de cabeceras de seguridad */}
        <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
        <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
        {/* Agrega otras cabeceras según tus necesidades */}
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/sicain" element={<Plogin />} />
          <Route path="/sicain/*" element={<AppRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
