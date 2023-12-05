import { Grid } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { Servicios } from "../services/Servicios";
import { CardC } from "./share/Card";

interface Ichat1 {
  total: number;
  FechaCreacion: string;
}

export const Bienvenido = () => {
  const [totalincidencias, settotalincidencias] = useState("");
  const [incidenciasporfechadata, setincidenciasporfechadata] = useState<
    Ichat1[]
  >([]);

  const gettotalincidencias = () => {
    let param = {};
    Servicios.totalincidencias(param).then((res) => {
      if (res.SUCCESS) {
        settotalincidencias(res.RESPONSE[0].total);
      }
    });
  };

  const incidenciasporfecha = () => {
    let param = {};
    Servicios.Incidenciasporfecha(param).then((res) => {
      if (res.SUCCESS) {
        setincidenciasporfechadata(res.RESPONSE);
      }
    });
  };

  useEffect(() => {
    gettotalincidencias();
    incidenciasporfecha();
  }, []);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <CardC
            name={"Incidencias"}
            descripcion={"Incidencias generadas"}
            valor={totalincidencias}
          ></CardC>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          {incidenciasporfechadata.length > 0 ? (
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: incidenciasporfechadata.map(
                    (item: Ichat1) => item?.FechaCreacion
                  ),
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: incidenciasporfechadata.map(
                    (item: Ichat1) => item?.total
                  ),
                },
              ]}
              width={500}
              height={300}
            />
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={6}>
          {/* <BarChart
            series={[
              { data: [3, 4, 1, 6, 5], stack: "A", label: "Series A1" },
              { data: [4, 3, 1, 5, 8], stack: "A", label: "Series A2" },
              { data: [4, 2, 5, 4, 1], stack: "B", label: "Series B1" },
              { data: [2, 8, 1, 3, 1], stack: "B", label: "Series B2" },
              { data: [10, 6, 5, 8, 9], label: "Series C1" },
            ]}
            width={400}
            height={250} */}
          {/* /> */}
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        paddingTop={"10px"}
      >
        <Grid item xs={12} sm={12} md={4} lg={3} style={{ height: "250px" }}>
          {/* <CardC></CardC> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} style={{ height: "250px" }}>
          {/* <CardC></CardC> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={6}>
          {/* <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            width={400}
            height={250}
          /> */}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        paddingTop={"10px"}
      >
        <Grid item xs={12} sm={12} md={4} lg={3} style={{ height: "250px" }}>
          {/* <CardC></CardC> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} style={{ height: "250px" }}>
          {/* <CardC></CardC> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={6}></Grid>
      </Grid>
    </Grid>
  );
};
