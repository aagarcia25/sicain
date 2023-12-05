import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { AlertS } from "../../../helpers/AlertS";
import { Servicios } from "../../../services/Servicios";
import Progress from "../../share/Progress";
import DatosEmpleado from "./DatosEmpleado";

export const Escaner = () => {
  const [slideropen, setslideropen] = useState(false);
  const [openview, setopenview] = useState(false);
  const [vrows, setVrows] = useState({});

  const handleClose = () => {
    setopenview(false);
  };
  const boxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
  };
  const qrReaderStyle = {
    width: "50%",
    height: "50%",
  };

  const valida = (numEmpleado: string) => {
    setslideropen(true);
    let data = {
      NumEmpleado: numEmpleado,
    };

    Servicios.Escaner(data).then((res) => {
      if (res.SUCCESS) {
        if (res.RESPONSE) {
          setVrows(res.RESPONSE);
          setopenview(true);
        } else {
          AlertS.fire({
            title: "¡Error!",
            text: "Favor de Validar sus Credenciales",
            icon: "error",
          });
        }
        setslideropen(false);
      } else {
        setslideropen(false);
        AlertS.fire({
          title: "¡Error!",
          text: "Sin Respuesta",
          icon: "error",
        });
      }
    });
  };

  const handleScan = (scanData: any) => {
    if (scanData && scanData !== "") {
      valida(scanData.text);
    }
  };

  return (
    <div>
      <Progress open={slideropen}></Progress>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box sx={boxStyle}>
            <div style={qrReaderStyle}>
              <QrReader
                scanDelay={300}
                constraints={{ facingMode: "environment" }}
                onResult={handleScan}
              />
            </div>
          </Box>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={4} lg={3}></Grid> */}
        {/* <Grid item xs={12} sm={12} md={4} lg={3}></Grid> */}
        {/* <Grid item xs={12} sm={12} md={4} lg={3}></Grid> */}
      </Grid>
      {openview ? (
        <DatosEmpleado handleClose={handleClose} datos={vrows} />
      ) : (
        ""
      )}
    </div>
  );
};
