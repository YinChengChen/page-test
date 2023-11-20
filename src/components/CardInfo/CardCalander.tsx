import {
  Box,
  Card,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DataCalander from "../DataCalander/DataCalander";
import { useState } from "react";

export default function CardCalander() {
  const currentTime = new Date();
  const startY = 2023;
  const [today, setToday] = useState({
    year: currentTime.getFullYear(),
    month: currentTime.getMonth() + 1,
  });
  const [kpfn, setKpfn] = useState(
    "./data/kp/kp_" +
      today.year.toString() +
      today.month.toString().padStart(2, "0") +
      ".json"
  );
  const [xrayfn, setXrayFn] = useState(
    "./data/xray/xray_" +
      today.year.toString() +
      today.month.toString().padStart(2, "0") +
      ".json"
  );

  let selectList = [];
  for (let i = startY; i <= currentTime.getFullYear(); i++) {
    if (i !== currentTime.getFullYear()) {
      for (let j = 1; j <= 12; j++) {
        selectList.push({
          y: i,
          m: j,
        });
      }
    } else {
      for (let j = 1; j <= currentTime.getMonth() + 1; j++) {
        selectList.push({
          y: i.toString(),
          m: j.toString().padStart(2, "0"),
        });
      }
    }
  }
  const [selectItem, setSelectItem] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectItem(event.target.value as string);
    setKpfn("./data/kp/kp_" + event.target.value + ".json");
    setXrayFn("./data/xray/xray_" + event.target.value + ".json");
    setToday((prev) => ({
      ...prev,
      year: parseInt(event.target.value.slice(0, 4)),
      month: parseInt(event.target.value.slice(4)),
    }));
  };
  return (
    <Box>
      <Card sx={{ display: "flex", my: 2, pb: 1, justifyContent: "center" }}>
        <Grid container>
          <Grid item xs={12} sx={{ mx: 2 }}>
            <Typography
              sx={{ mt: 2 }}
              variant="h5"
              gutterBottom
              textAlign="center"
            >
              GPS 電離層擾動情形
            </Typography>
            <hr />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" sx={{ pr: 2 }}>
              {today.year} / {today.month} 月
            </Typography>

            <FormControl sx={{ minWidth: 170 }}>
              <InputLabel id="demo-simple-select-label">Year/Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectItem}
                label="Year/Month"
                onChange={handleChange}
              >
                {selectList.map((item) => (
                  <MenuItem value={item.y.toString() + item.m.toString()}>
                    {item.y}/{item.m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <DataCalander kp={kpfn} xray={xrayfn} />
      {/* <Box sx={{ display: "flex", gap: 2, pb: 2, pt: 0 }}> */}
        {/* <Card>
          <CardContent sx={{ pb: 0 }}>
            <CardActions
              sx={{ pt: 0, pr: 2, pl: 0, justifyContent: "space-between" }}
            >
              <Typography variant="h6">Kp Index</Typography>
              <Button
                size="small"
                href="https://www.spaceweatherlive.com/en/help/the-kp-index.html"
                target="_blank"
              >
                參考資訊
              </Button>
            </CardActions>
            <Typography>
              Kp指數是一個全球地磁活動指數，基於全球各地地基磁力儀的3小時測量數據。Kp指數的範圍從0到9，其中0表示地磁活動非常微弱，而9表示極端的地磁風暴。
            </Typography>
          </CardContent>
        </Card> */}
        {/* <Card>
          <CardContent>
            <CardActions
              sx={{ pt: 0, pr: 2, pl: 0, justifyContent: "space-between" }}
            >
              <Typography variant="h6">Solar Flare</Typography>
              <Button
                size="small"
                href="https://www.spaceweatherlive.com/en/help/what-are-solar-flares.html"
                target="_blank"
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
        </Card> */}
      {/* </Box> */}
    </Box>
  );
}
