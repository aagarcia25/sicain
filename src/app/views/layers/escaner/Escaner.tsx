import { Box, Grid } from "@mui/material";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";

export const Escaner = () => {
  const navigate = useNavigate();

  const boxStyle = {
    // Resto de los estilos del Box (como se mencionó anteriormente)
    // ...

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
  };
  const qrReaderStyle = {
    width: "50%",
    height: "50%",
  };

  const handleScan = (scanData: any) => {
    if (scanData && scanData !== "") {
      navigate("/inicio/VisistasEscaneo/" + scanData.text);
    }
  };

  return (
    <div>
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
      ;
    </div>
  );
};
