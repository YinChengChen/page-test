import {
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ReactVideoGallery from "../ReactVideoGallery/ReactVideoGallery";
import { useState } from "react";
interface videoProps {
  poster: string;
  videoUrl: string;
}

export default function CardEvents() {
  const [targetTime, setTargetTime] = useState("00");
  const cardTitle = "GPS 電離層擾動測報";

  let selectList = [];
  for (let i = 0; i < 24; i++) selectList.push(i.toString().padStart(2, "0"));

  const initialVideoList: videoProps = {
    poster: "./data/images/01/test_0001.png",
    videoUrl: "./data/movie/movie_202307501.mp4",
  };
  const [videoList, setVideoList] = useState<videoProps>(initialVideoList);

  const handleChange = (event: SelectChangeEvent) => {
    setTargetTime(event.target.value);
    let tmp = event.target.value;
    let nextTmp = parseInt(tmp) + 1;
    let newList: videoProps = {
      poster:
        "./data/images/" +
        nextTmp.toString().padStart(2, "0") +
        "/test_" +
        tmp.toString().padStart(2, "0") +
        "01.png",
      videoUrl:
        "./data/movie/movie_2023075" +
        nextTmp.toString().padStart(2, "0") +
        ".mp4",
    };

    setVideoList(newList);
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom textAlign="center">
          {cardTitle}
        </Typography>
        <hr />
        {/* <ImageGallery/> */}
        <Box sx={{ display: "flex", my: 2 }} gap={2}>
          <Typography variant="h6" textAlign="left">
            圖中為不同GPS衛星觀測電離層梯度隨時間的變化。電離層梯度為電離層延遲量與相應兩面測站基線長度之比。基線長限制在
            50
            公里，因此北中南各挑選五股(wuku)、清水(chin)、成大(ncku)站為基站，搭配氣象局其他地面追蹤站組成網格狀分布。梯度值可分為寧靜期(藍紫色帶)、中度擾動(黃綠色帶)和強擾動(橘紅色帶)供使用者參考。
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center", my: 2}}>
          <Grid item xs>
              <Typography
                sx={{ alignSelf: "center" }}
                variant="h5"
                textAlign="center"
              >
                2023/03/16 {targetTime} UT
              </Typography>
            </Grid>
            <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
              <FormControl sx={{ minWidth: 80 }}>
                <InputLabel id="demo-simple-select-label">Hour</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={targetTime}
                  label="Hour"
                  onChange={handleChange}
                >
                  {selectList.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
          </Grid>

          {/* <Grid item xs={6} md={4} xl={3}>
              <ReactVideoGallery {} />
            </Grid> */}
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            {/* <video width='inherit' poster={videoList.poster} src={videoList.videoUrl}></video> */}
            <ReactVideoGallery {...videoList} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
