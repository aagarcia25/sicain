import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import ModalForm from "../../share/ModalForm";
import Progress from "../../share/Progress";
import MUIXDataGrid from "../../share/MUIXDataGrid";
import { GridColDef } from "@mui/x-data-grid";

const DatosEmpleado = ({
  datos,
  handleClose,
}: {
  datos: any;
  handleClose: Function;
}) => {
  const [open, setOpen] = useState(false);
  const [openHist, setopenHist] = useState(false);
  const [data, setData] = useState([]);

  const columnsRel: GridColDef[] = [
    {
      field: "id",
    },

    {
      field: "fecha",
      headerName: "Fecha",
      description: "Fecha",
      width: 150,
    },
    {
      field: "HoraEntrada",
      headerName: "Hora Entrada",
      description: "Hora Entrada",
      width: 150,
    },
    {
      field: "HoraSalida",
      headerName: "Hora Salida",
      description: "Hora Salida",
      width: 150,
    },
  ];
  const openhist = () => {
    if (openHist) {
      setopenHist(false);
    } else {
      setopenHist(true);
    }
  };

  return (
    <>
      <Progress open={open}></Progress>
      <ModalForm title={"Datos de Empleado"} handleClose={handleClose}>
        <Box boxShadow={3}>
          <Grid container spacing={1} padding={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h5">Número de Empleado:</Typography>
              {datos.NumeroEmpleado}
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h5">Nombre:</Typography> {datos.Nombre}
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h5"> Apellido Paterno:</Typography>{" "}
              {datos.ApellidoP}
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h5">Apellido Materno:</Typography>{" "}
              {datos.ApellidoM}
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h5"> Razón Social:</Typography>{" "}
              {datos.RazonSocial}
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
                  backgroundColor: "green",
                }}
              >
                Registrar Entrada
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                className={"actualizar"}
              >
                Registrar Salida
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "blue",
                }}
                onClick={openhist}
              >
                {openHist ? "Ocultar Historial" : "Ver Historial"}
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "blue",
                }}
              >
                Generar Incidencia
              </Button>
            </Grid>
          </Grid>
        </Box>
        {openHist ? (
          <Box boxShadow={3}>
            <MUIXDataGrid columns={columnsRel} rows={data} />
          </Box>
        ) : (
          ""
        )}
      </ModalForm>
    </>
  );
};

export default DatosEmpleado;
