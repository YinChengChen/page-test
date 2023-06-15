import { useState, useEffect } from "react";
import { Grid, Typography, Card, Box } from "@mui/material";
import { lightBlue, blue } from "@mui/material/colors";
interface dateList {
  kp: string;
  xray: string;
}

interface MatrixItem {
  week: number;
  day: string;
  kp: string;
  xray: string;
  kpColor: string;
  xrayColor: string;
}
const DataCalander = (dateList: dateList) => {
  const weeks = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const [clander, setClander] = useState<MatrixItem[]>([]);
  useEffect(() => {
    const fetchData = async (kfn: string, xfn: string) => {
      let res = await fetch(kfn);
      let kdata = await res.json();
      res = await fetch(xfn);
      let xdata = await res.json();

      //@ts-ignore
      let tmp = new Date(xdata[0].Date);
      let startWeek = tmp.getDay();
      // @ts-ignore
      let matrix = [];
      for (let i = 0; i < startWeek; i++)
        matrix.push({
          week: i,
          day: "",
          kp: "",
          xray: "",
          kpColor: "",
          xrayColor: "",
        });
      // @ts-ignore
      xdata.map((item) => {
        // @ts-ignore
        let kpEl = kdata.find((element) => element.Date === item.Date);
        let intPart = Math.round(kpEl.kp);
        let delPart = kpEl.kp - intPart;
        tmp = new Date(item.Date);
        let alpha = item.xray[0];
        let color = "";
        if (alpha === "M") color = "#FF0000";
        else if (alpha === "C") color = "#FF9900";
        else if (alpha === "X") color = "#B10A0E";
        else if (alpha === "B") color = "#018000";
        let kpColor = "";
        if (intPart < 5) kpColor = "#D1E7DD";
        else if (intPart >= 5 && intPart < 7) kpColor = "#FFF3CD";
        else if (intPart >= 7) kpColor = "#F8D7DA";
        matrix.push({
          week: tmp.getDay(),
          day: item.Date.slice(8),
          kp: "Kp" + intPart.toString() + (delPart >= 0 ? "+" : "-"),
          xray: item.xray,
          kpColor: kpColor,
          xrayColor: color,
        });
      });
      setClander(matrix);
    };
    fetchData(dateList.kp, dateList.xray);
    console.log("clander", clander);
  }, [dateList.kp]);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, p: 0, m: 0 }}>
        {weeks.map((item) => (
          <Card
            sx={{ flexGrow: 1, py: 2, my: 2 }}
            style={{
              background:
                item === "星期日" || item === "星期六"
                  ? blue[800]
                  : lightBlue[800],
            }}
          >
            <Typography textAlign="center">{item}</Typography>
          </Card>
        ))}
      </Box>
      <Grid container spacing={2} sx={{ flexGlow: 1, mb: 3 }}>
        {clander.map((item) => (
          <Grid item xs={12 / 7} style={{ opacity: item.day === "" ? 0 : 100 }}>
            <Card
              sx={{ py: 2 }}
              style={{
                background:
                  item.week % 7 === 0 || item.week % 7 === 6
                    ? blue[800]
                    : lightBlue[800],
              }}
            >
              <Typography textAlign="center">{item.day}</Typography>
              <Box
                sx={{ display: "flex", gap: 2, justifyContent: "space-around" }}
              >
                <Typography sx={{ color: item.xrayColor }} textAlign="center">
                  {item.xray}
                </Typography>
                <Typography sx={{ color: item.kpColor }} textAlign="center">
                  {item.kp}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DataCalander;
