import {
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ImageGallery from "../ImageGallery/ImageGallery";
import ReactVideoGallery from "../ReactVideoGallery/ReactVideoGallery";
import { useState } from "react";
interface videoProps {
  poster: string;
  videoUrl: string;
}

export default function CardEvents() {
  const [targetTime, setTargetTime] = useState("16");
  const cardTitle = "近期事件 - 2023/03/16 電漿泡事件";
  const mm = [10, 20, 30, 40, 50, 60];

  let selectList = [];
  for (let i = 9; i < 17; i++) selectList.push(i.toString().padStart(2, "0"));

  const initialVideoList: videoProps[] = [
    {
      poster: "./data/images/test_" + targetTime + mm[0].toString() + "00.png",
      videoUrl:
        "./data/movies/movie_2023075" +
        (parseInt(targetTime) + 1).toString().padStart(2, "0") +
        mm[0].toString() +
        ".mp4",
    },
    {
      poster: "./data/images/test_" + targetTime + mm[1].toString() + "00.png",
      videoUrl:
        "./data/movies/movie_2023075" +
        (parseInt(targetTime) + 1).toString().padStart(2, "0") +
        mm[1].toString() +
        ".mp4",
    },
    {
      poster: "./data/images/test_" + targetTime + mm[2].toString() + "00.png",
      videoUrl:
        "./data/movies/movie_2023075" +
        (parseInt(targetTime) + 1).toString().padStart(2, "0") +
        mm[2].toString() +
        ".mp4",
    },
    {
      poster: "./data/images/test_" + targetTime + mm[3].toString() + "00.png",
      videoUrl:
        "./data/movies/movie_2023075" +
        (parseInt(targetTime) + 1).toString().padStart(2, "0") +
        mm[3].toString() +
        ".mp4",
    },
    {
      poster: "./data/images/test_" + targetTime + mm[4].toString() + "00.png",
      videoUrl:
        "./data/movies/movie_2023075" +
        (parseInt(targetTime) + 1).toString().padStart(2, "0") +
        mm[4].toString() +
        ".mp4",
    },
    {
      poster: "./data/images/test_" + targetTime + mm[5].toString() + "00.png",
      videoUrl:
        "./data/movies/movie_2023075" +
        (parseInt(targetTime) + 1).toString().padStart(2, "0") +
        mm[5].toString() +
        ".mp4",
    },
  ];
  const [videoList, setVideoList] = useState<videoProps[]>(initialVideoList);
  
  const handleChange = (event: SelectChangeEvent) => {
    setTargetTime(event.target.value);
    let tmp = event.target.value;
    let nextTmp = parseInt(tmp) + 1;
    let newList: videoProps[] = [];
    mm.map((item) => {
      newList.push({
        poster: "./data/images/test_" + tmp + item.toString() + "00.png",
        videoUrl:
          "./data/movies/movie_2023075" +
          nextTmp.toString().padStart(2, "0") +
          item.toString() +
          ".mp4",
      });
    });
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
        <Grid container sx={{ py: 2, justifyContent: "center" }}>
          <Grid item md></Grid>
          <Grid item xs md>
            <Typography variant="h4" textAlign="center">
              Gradient [mm/km] {targetTime}:00 UT
            </Typography>
          </Grid>
          <Grid
            item
            xs
            md
            sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}
          >
            <FormControl sx={{ minWidth: 120 }}>
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
        <Grid container spacing={2}>
          {videoList.map((item) => (
            <Grid item xs={6} md={4} xl={3}>
              <ReactVideoGallery {...item} />
            </Grid>
          ))}

          {/* <Grid item xs>

            </Grid>
            <Grid item xs>

            </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  );
}
