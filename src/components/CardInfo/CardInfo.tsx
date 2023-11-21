import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";
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
    <Box sx={{ display: "flex", gap: 2 }}>
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
      <Card>
        <CardContent sx={{ pb: 0 }}>
          <CardActions
            sx={{ pt: 0, pr: 2, pl: 0, justifyContent: "space-between" }}
          >
            <Typography variant="h6">Kp Index</Typography>
            <Button
              size="small"
              href="https://www.spaceweatherlive.com/en/help/the-kp-index.html"
            >
              參考資訊
            </Button>
          </CardActions>
          <Typography>
            Kp指數是一個全球地磁活動指數，基於全球各地地基磁力儀的3小時測量數據。Kp指數的範圍從0到9，其中0表示地磁活動非常微弱，而9表示極端的地磁風暴。
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardActions
            sx={{ pt: 0, pr: 2, pl: 0, justifyContent: "space-between" }}
          >
            <Typography variant="h6">Solar Flare</Typography>
            <Button
              size="small"
              href="https://www.spaceweatherlive.com/en/help/what-are-solar-flares.html"
            >
              參考資訊
            </Button>
          </CardActions>
          <Typography>
            太陽耀斑是太陽表面上的巨大爆炸，由於太陽黑子的磁場線纏繞和爆發而發生。它們以突然、迅速和強烈的亮度變化為特徵。太陽耀斑發生在太陽大氣層中積累的磁能突然釋放時。在短短幾分鐘內，物質被加熱到數百萬度，並發射出從長波長的無線電波到光學輻射、X射線和γ射線的輻射，幾乎涵蓋了整個電磁波譜。
          </Typography>
          <Typography>
            太陽耀斑根據在地球附近以1至8埃安斯特倫（Angstroms）的X射線的峰值通量（以每平方米瓦特，W/m2，為單位）分類為A、B、C、M或X級。
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
