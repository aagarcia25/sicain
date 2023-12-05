import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertS } from "../../../helpers/AlertS";
import { Servicios } from "../../../services/Servicios";
import ModalForm from "../../share/ModalForm";
import Progress from "../../share/Progress";
const ReporteIncidencia = ({
  handleClose,
  data,
}: {
  handleClose: Function;
  data: any;
}) => {
  const navigate = useNavigate();
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const constraints = { video: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setVideoStream(stream);
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    initializeCamera();
  }, []);

  const restartCamera = async () => {
    // Detener la cámara actual
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    // Iniciar la cámara nuevamente
    const constraints = { video: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    setVideoStream(stream);
  };

  const capturePhoto = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL("image/jpeg");
        setPhotoData(imageDataURL);
      }
    }
  };

  const saveIncidencia = () => {
    setOpen(true);
    let dataForm = {
      Foto: photoData,
      Observaciones: mensaje,
      IdEmpleado: data?.Id,
    };

    Servicios.incidencia(dataForm).then((res) => {
      if (res.SUCCESS) {
        AlertS.fire({
          title: "!Aviso!",
          text: "se Registro la Incidencia",
          icon: "success",
        });
        navigate("/escaner");
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

  const deletePhoto = () => {
    setPhotoData(null);
    restartCamera(); // Reiniciar la cámara al regresar al paso 1
  };

  const videoStyle = {
    width: "50%",
    height: "50%",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Progress open={open} />
      <ModalForm title={"Generar Incidencia"} handleClose={handleClose}>
        <Box boxShadow={3}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              {!photoData ? (
                <div style={videoStyle}>
                  <h2>Habilite la camara</h2>
                  <video ref={videoRef} autoPlay playsInline />
                </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              {photoData && (
                <div style={videoStyle}>
                  <h2>Vista Previa</h2>
                  <img src={photoData} alt="Captured" />
                </div>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <Button
                variant="contained"
                color="success"
                onClick={capturePhoto}
              >
                Tomar Fotografía
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <Button variant="contained" color="error" onClick={deletePhoto}>
                Borrar Foto
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            padding={1}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <textarea
                style={{ width: "100%", height: "110px", resize: "none" }}
                rows={10}
                value={mensaje}
                placeholder="Describe la incidencia"
                onChange={(e) => setMensaje(e.target.value)}
                autoComplete="off"
              ></textarea>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            padding={1}
          >
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <Button
                startIcon={<SaveIcon></SaveIcon>}
                variant="contained"
                color="success"
                onClick={saveIncidencia}
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}></Grid>
          </Grid>
        </Box>
      </ModalForm>
    </div>
  );
};

export default ReporteIncidencia;
