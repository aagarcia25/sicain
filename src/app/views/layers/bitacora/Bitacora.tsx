import React, { useEffect, useState } from "react";
import TitleComponent from "../../share/TitleComponent";
import { Grid } from "@mui/material";
import MUIXDataGrid from "../../share/MUIXDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { Servicios } from "../../../services/Servicios";
import { AlertS } from "../../../helpers/AlertS";

export const Bitacora = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    { field: "Id", headerName: "ID", width: 150 },
    { field: "IdEmpleado", headerName: "ID Empleado", width: 150 },
    { field: "Fecha", headerName: "Fecha", width: 150 },
    { field: "HoraEntrada", headerName: "Hora Entrada", width: 150 },
    { field: "HoraSalida", headerName: "Hora Salida", width: 150 },
    { field: "Completado", headerName: "Completado", width: 150 },
    {
      field: "NumeroEmpleado",
      headerName: "Número Empleado",
      width: 150,
    },
    { field: "Nombre", headerName: "Nombre", width: 150 },
    { field: "ApellidoP", headerName: "Apellido Paterno", width: 150 },
    { field: "ApellidoM", headerName: "Apellido Materno", width: 150 },
    { field: "RazonSocial", headerName: "Razón Social", width: 150 },
  ];

  const bitacoraall = () => {
    setOpen(true);
    let param = {};

    Servicios.Bitacorafull(param).then((res) => {
      if (res.SUCCESS) {
        setData(res.RESPONSE);
        setOpen(false);
      } else {
        setOpen(false);
        AlertS.fire({
          title: "¡Error!",
          text: "Sin Respuesta",
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    bitacoraall();
  }, []);

  return (
    <div>
      <TitleComponent title={"Historial de ingresos"} show={open} />

      <Grid container spacing={1} padding={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <MUIXDataGrid columns={columns} rows={data} />
        </Grid>
      </Grid>
    </div>
  );
};
