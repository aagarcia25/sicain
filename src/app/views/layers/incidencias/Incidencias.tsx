import React, { useEffect, useState } from "react";
import TitleComponent from "../../share/TitleComponent";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import MUIXDataGrid from "../../share/MUIXDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { Servicios } from "../../../services/Servicios";
import { AlertS } from "../../../helpers/AlertS";
import IncidenciasModal from "./IncidenciasModal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ReporteIncidencia from "../escaner/ReporteIncidencia";
import ButtonsAdd from "../../share/ButtonsAdd";
import { Escaner } from "../escaner/Escaner";
const Incidencias = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [openIncidencia, setopenIncidencia] = useState(false);
  const [data, setData] = useState([]);
  const [vrows, setVrows] = useState({});

  const handleOpen = (v: any) => {
    setopenIncidencia(true);
  };

  const handleClose = () => {
    setopenModal(false);
    setopenIncidencia(false);
  };

  const columnsRel: GridColDef[] = [
    {
      field: "id",
    },
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Ver Inidencia">
              <IconButton onClick={() => openmodal(v)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "FechaCreacion",
      headerName: "Fecha de Incidencia",
      description: "Fecha de Incidencia",
      width: 130,
    },

    {
      field: "NumeroEmpleado",
      headerName: "Número de Empleado",
      description: "Número de Empleado",
      width: 150,
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      description: "Nombre",
      width: 150,
    },

    {
      field: "ApellidoP",
      headerName: "Apelido Paterno",
      description: "Apelido Paterno",
      width: 150,
    },
    {
      field: "ApellidoM",
      headerName: "Apelido Materno",
      description: "Apelido Materno",
      width: 150,
    },
    {
      field: "RazonSocial",
      headerName: "Razon Social",
      description: "Razon Social",
      width: 150,
    },
    {
      field: "Observaciones",
      headerName: "Observaciones",
      description: "Observaciones",
      width: 200,
    },
    {
      field: "Foto",
      headerName: "Foto",
      description: "Foto",
      width: 100,
      renderCell: (params) => <ImageCellRenderer value={params.value} />,
    },
  ];

  const openmodal = (data: any) => {
    setVrows(data.row);
    setopenModal(true);
  };
  const ImageCellRenderer = ({ value }: { value: string }) => {
    return <img src={value} alt="Imagen" width="50" height="50" />;
  };

  const getall = () => {
    setOpen(true);

    Servicios.incidenciaList(data).then((res) => {
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
    getall();
  }, []);

  return (
    <div>
      <TitleComponent title={"Incidencias"} show={open} />
      <Grid container spacing={1} padding={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ButtonsAdd handleOpen={handleOpen} agregar={true} />
          <MUIXDataGrid columns={columnsRel} rows={data} />
        </Grid>
      </Grid>

      {openIncidencia ? <Escaner handleClose={handleClose} /> : ""}
      {openModal ? (
        <IncidenciasModal
          datos={vrows}
          handleClose={handleClose}
        ></IncidenciasModal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Incidencias;
