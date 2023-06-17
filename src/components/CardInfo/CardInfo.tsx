import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
export default function CardInfo() {
  const cardTitle = "最新太陽活動";
  const itemNames = ["Kp Index", "Solar Flare"];
  const [kp, setKp] = useState({
    Date: "",
    Time: "",
    Color: "",
    Value: "",
  });
  const [xray, setXray] = useState({
    Date: "",
    Color: "",
    Value: "",
  });
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1;
  useEffect(() => {
    const kpfn =
      "./data/kp/kp_" +
      year.toString() +
      month.toString().padStart(2, "0") +
      ".json";
    const fetchKp = async (fn: string) => {
      let res = await fetch(fn);
      let data = await res.json();
      let tmp = data[data.length - 1];
      let intPart = Math.round(tmp.kp);
      let delPart = tmp.kp - intPart;
      let color = "";
      if (intPart < 5) color = "#D1E7DD";
      else if (intPart >= 5 && intPart < 7) color = "#FFF3CD";
      else if (intPart >= 7) color = "#F8D7DA";
      let np = delPart >= 0 ? "+" : "-";
      setKp((prev) => ({
        ...prev,
        Date: tmp.Date,
        Time: tmp.Time[0] + tmp.Time[1],
        Color: color,
        Value: "Kp" + intPart.toString() + np,
      }));
    };
    fetchKp(kpfn);
    const xyfn =
      "./data/xray/xray_" +
      year.toString() +
      month.toString().padStart(2, "0") +
      ".json";
    const fetchXray = async (fn: string) => {
      let res = await fetch(fn);
      let data = await res.json();
      let tmp = data[data.length - 1];
      let alpha = tmp.xray[0];
      let color = "";
      if (alpha === "M") color = "#FF0000";
      else if (alpha === "C") color = "#FF9900";
      else if (alpha === "X") color = "#B10A0E";
      else if (alpha === "B") color = "#018000";
      setXray((prev) => ({
        ...prev,
        Date: tmp.Date,
        Color: color,
        Value: tmp.xray,
      }));
    };
    fetchXray(xyfn);
  }, [year, month]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom textAlign="center">
          {cardTitle}
        </Typography>
        <hr />
        <Grid container>
          <Grid item xs={6}>
            <Typography sx={{ my: 1 }} component="div" textAlign="center">
              {itemNames[0]}
            </Typography>
            <Typography
              sx={{ my: 2 }}
              variant="h5"
              component="div"
              textAlign="center"
              color={kp.Color}
            >
              {kp.Value}
            </Typography>
            <Typography
              sx={{ fontSize: 14, my: 1 }}
              color="text.secondary"
              textAlign="center"
            >
              {kp.Date} {kp.Time} UT
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ my: 1 }} component="div" textAlign="center">
              {itemNames[1]}
            </Typography>
            <Typography
              sx={{ my: 2 }}
              variant="h5"
              component="div"
              textAlign="center"
              color={xray.Color}
            >
              {xray.Value}
            </Typography>
            <Typography
              sx={{ fontSize: 14, mt: 1 }}
              color="text.secondary"
              textAlign="center"
            >
              {xray.Date}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
