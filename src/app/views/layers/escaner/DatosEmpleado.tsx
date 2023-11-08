import { Box, Button, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { AlertS } from "../../../helpers/AlertS";
import { Servicios } from "../../../services/Servicios";
import MUIXDataGrid from "../../share/MUIXDataGrid";
import ModalForm from "../../share/ModalForm";
import Progress from "../../share/Progress";
import ReporteIncidencia from "./ReporteIncidencia";

interface Ibitacora {
  Id: string;
  HoraEntrada: string;
  HoraSalida: string;
  Completado: number;
}

const DatosEmpleado = ({
  datos,
  handleClose,
}: {
  datos: any;
  handleClose: Function;
}) => {
  const [open, setOpen] = useState(false);
  const [openHist, setopenHist] = useState(false);
  const [openIncidencia, setopenIncidencia] = useState(false);
  const [data, setData] = useState([]);
  const [bitacora, setbitacora] = useState<Ibitacora[]>([]);

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

  const registroentrada = () => {
    setOpen(true);
    let data = {
      Tipo: 1,
      idEmpleado: datos.Id,
    };

    Servicios.Registra(data).then((res) => {
      if (res.SUCCESS) {
        AlertS.fire({
          title: "!Información!",
          text: "Se ha Registrado su Acceso",
          icon: "success",
        });
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

  const registrosalida = () => {
    setOpen(true);
    let data = {
      Tipo: 2,
      idEmpleado: datos.Id,
      idbitacora: bitacora[0].Id,
    };

    Servicios.Registra(data).then((res) => {
      if (res.SUCCESS) {
        AlertS.fire({
          title: "!Información!",
          text: "Se ha Registrado su Salida",
          icon: "success",
        });
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

  const openincidencia = () => {
    setopenIncidencia(true);
  };
  const openhist = () => {
    if (openHist) {
      setopenHist(false);
    } else {
      getbitacora();
      setopenHist(true);
    }
  };

  const getbitacora = () => {
    setOpen(true);
    let data = {
      idEmpleado: datos.Id,
    };

    Servicios.Bitacora(data).then((res) => {
      if (res.SUCCESS) {
        if (res.RESPONSE) {
          setData(res.RESPONSE);
        } else {
          AlertS.fire({
            title: "¡Error!",
            text: "Favor de Validar sus Credenciales",
            icon: "error",
          });
        }
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

  const validabitacora = () => {
    setOpen(true);
    let data = {
      NumEmpleado: datos.Id,
    };

    Servicios.BitacoraSingle(data).then((res) => {
      if (res.SUCCESS) {
        if (res.RESPONSE) {
          setbitacora(res.RESPONSE);
          console.log(bitacora);
        }
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
    validabitacora();
  }, [datos]);

  return (
    <>
      <Progress open={open}></Progress>
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
              {bitacora.length === 0 ? (
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "green",
                  }}
                  onClick={registroentrada}
                >
                  Registrar entrada
                </Button>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}>
              {bitacora.length !== 0 ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  className={"actualizar"}
                  onClick={registrosalida}
                >
                  Registrar Salida
                </Button>
              ) : (
                ""
              )}
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
                onClick={openincidencia}
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
      {openIncidencia ? (
        <ReporteIncidencia handleClose={handleClose} data={datos} />
      ) : (
        ""
      )}
    </>
  );
};

export default DatosEmpleado;
