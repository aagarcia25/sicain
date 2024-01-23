import { Box, Button, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AlertS } from "../../../helpers/AlertS";
import { Servicios } from "../../../services/Servicios";
import MUIXDataGrid from "../../share/MUIXDataGrid";
import ModalForm from "../../share/ModalForm";
import Progress from "../../share/Progress";
import ReporteIncidencia from "./ReporteIncidencia";

const DatosEmpleado = ({
  datos,
  handleClose,
}: {
  datos: any;
  handleClose: Function;
}) => {
  const [openIncidencia, setopenIncidencia] = useState(false);

  const openincidencia = () => {
    setopenIncidencia(true);
  };

  return (
    <>
      <ModalForm title={"Datos de Empleado"} handleClose={handleClose}>
        <Box boxShadow={3}>
          <Grid container spacing={0} padding={2}>
            <Grid item xs={12} sm={2} md={3} lg={3}>
              <img
                src="https://picsum.photos/200/300"
                alt="Imagen Aleatoria"
                height="150"
              ></img>
            </Grid>
            <Grid item xs={12} sm={5} md={3} lg={3}>
              <Typography variant="h5">Número de Empleado:</Typography>
              {datos.NumeroEmpleado}
            </Grid>
            <Grid item xs={12} sm={5} md={3} lg={3}>
              <Typography variant="h5"> Razón Social:</Typography>{" "}
              {datos.RazonSocial}
            </Grid>
          </Grid>
          <Grid container spacing={0} padding={2}>
            <Grid item xs={12} sm={3} md={4} lg={3}>
              <Typography variant="h5">Nombre:</Typography> {datos.Nombre}
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={3}>
              <Typography variant="h5"> Apellido Paterno:</Typography>{" "}
              {datos.ApellidoP}
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={3}>
              <Typography variant="h5">Apellido Materno:</Typography>{" "}
              {datos.ApellidoM}
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ padding: "2%" }}
          >
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "blue",
                }}
                onClick={openincidencia}
              >
                Generar Incidencia
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
          </Grid>
        </Box>
      </ModalForm>
      {openIncidencia ? (
        <ReporteIncidencia handleClose={handleClose} data={datos} />
      ) : (
        ""
      )}
    </>
  );
};

export default DatosEmpleado;
