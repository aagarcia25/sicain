import React, { useState } from "react";
import TitleComponent from "../../share/TitleComponent";
import { Grid } from "@mui/material";
import MUIXDataGrid from "../../share/MUIXDataGrid";
import { GridColDef } from "@mui/x-data-grid";

export const Bitacora = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const columnsRel: GridColDef[] = [
    {
      field: "id",
    },

    {
      field: "NumeroEmpleado",
      headerName: "Número de Empleado",
      description: "Número de Empleado",
      width: 150,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      description: "Nombre",
      width: 100,
    },

    {
      field: "ApellidoP",
      headerName: "Apelido Paterno",
      description: "Apelido Paterno",
      width: 100,
    },
    {
      field: "ApellidoM",
      headerName: "Apelido Materno",
      description: "Apelido Materno",
      width: 100,
    },
    {
      field: "RazonSocial",
      headerName: "Razon Social",
      description: "Razon Social",
      width: 100,
    },
  ];
  return (
    <div>
      <TitleComponent title={"Historial de ingresos"} show={open} />

      <Grid container spacing={1} padding={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <MUIXDataGrid columns={columnsRel} rows={data} />
        </Grid>
      </Grid>
    </div>
  );
};
