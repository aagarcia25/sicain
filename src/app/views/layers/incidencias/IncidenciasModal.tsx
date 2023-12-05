import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import ModalForm from "../../share/ModalForm";

const IncidenciasModal = ({
  datos,
  handleClose,
}: {
  datos: any;
  handleClose: Function;
}) => {
  useEffect(() => {}, []);

  return (
    <div>
      <ModalForm title={"Generar Incidencia"} handleClose={handleClose}>
        <Box boxShadow={3}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            padding={1}
            spacing={1}
          >
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <Typography variant="body1">Fecha de Incidencia:</Typography>
              {datos.FechaCreación}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <Typography variant="body1">Número de Empleado:</Typography>
              {datos.NumeroEmpleado}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <Typography variant="body1">Nombre:</Typography>
              {datos.Nombre} {datos.ApellidoP} {datos.ApellidoM}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <Typography variant="body1">Razón Social:</Typography>
              {datos.RazonSocial}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}></Grid>

            <Grid item xs={12} sm={6} md={6} lg={2}></Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            padding={1}
            spacing={1}
          >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="body1">Imagen:</Typography>
              <img src={datos.Foto} alt="Imagen" width="250" height="250" />;
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="body1">Observación:</Typography>
              {datos.Observaciones}
            </Grid>
          </Grid>
        </Box>
      </ModalForm>
    </div>
  );
};

export default IncidenciasModal;
