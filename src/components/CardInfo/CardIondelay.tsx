import { useEffect, useState, useRef, FC } from "react";
import { Badge, Card, CardContent, Typography, Grid, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from "@mui/material/Checkbox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import ImageGalleryIon from "../ImageGallery/ImageGalleryIon";
import ImageGalleryIonMap from "../ImageGallery/ImageGalleryIonMap";
import { DatePicker } from "@mui/x-date-pickers";
import MyMap from "../LeaflatMap/MyMap";

interface MatrixItem {
  year: number;
  month: number;
  day: number;
  doy: string;
}

interface list {
  id: number,
  stat: string,
  lon: number,
  lat: number,
  zh: string,
}

const CardIondelay: FC = () => {
  const cardTitle = "電離層延遲量";
  const today = dayjs(new Date());
  const [value] = useState<Dayjs>(today.subtract(2, "M"));
  const [dateList, setDateList] = useState<MatrixItem[]>([]);
  const dp = "./pickerDate.json";
  const [folder, setFolder] = useState("2023.244");
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  const [stations, setStations] = useState<list[]>([]);
  const [station, setStation] = useState<string[]>(['aknd', 'chin', 'wuku']);

  const handleChange = (value: Dayjs) => {
    let y = value?.get("year");
    //@ts-ignore
    let m = value?.get("month") + 1;
    let d = value?.get("date");
    //@ts-ignore
    dateList.filter((item) => {
      if (item.year === y && item.month === m && item.day === d) {
        setFolder(item.doy);
      }
    });
  };

  function fetchList() {
    return fetch(dp)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        throw error;
      });
  }

  function fetchData(
    date: Dayjs,
    dateList: any[],
    { signal }: { signal: AbortSignal }
  ) {
    return new Promise<{ daysToHighLight: number[] }>((resolve, reject) => {
      const timeout = setTimeout(() => {
        const monthOfDate = date.month() + 1;
        const yearOfDate = date.year();
        //@ts-ignore
        // const daysToHighLight = [1, 9, 26];
        const daysToHighLight: any[] = [];
        dateList.forEach((item) => {
          if (item.month === monthOfDate && item.year === yearOfDate) {
            daysToHighLight.push(item.day);
          }
        });
        resolve({ daysToHighLight });
      }, 500);
      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException("aborted", "AbortError"));
      };
    });
  }

  function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
  ) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? "🟡" : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  }

  const fetchHighLightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fetchList()
      .then((result) => {
        setDateList(result);
        return fetchData(date, result, {
          signal: controller.signal,
        });
      })
      .then(({ daysToHighLight }) => {
        setHighlightedDays(daysToHighLight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  function fetchStation(){
    return fetch("./stat_zh.json")
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        throw error;
      });
}
  useEffect(() => {
    fetchHighLightedDays(value);
    fetchStation().then((result)=>{
      setStations(result)
    })
    
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighLightedDays(date);
  };

  const handleYearChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighLightedDays(date);
  };

  const handleSelectChange = (event: SelectChangeEvent<typeof station>) => {
    const { target: { value },} = event;
    // console.log(value);
    setStation(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom textAlign="center">
          {cardTitle}
        </Typography>
        <hr />
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} sx={{ mb: 2 }}>            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                sx={{ width: "100%"}}             
                  label="Month/Day/Year"
                  views={["year", "month", "day"]}
                  value={value}
                  loading={isLoading}
                  onMonthChange={handleMonthChange}
                  onYearChange={handleYearChange}
                  renderLoading={() => <DayCalendarSkeleton />}
                  slots={{
                    day: ServerDay,
                  }}
                  slotProps={{
                    day: {
                      highlightedDays,
                    } as any,
                  }}
                  // @ts-ignore
                  onChange={handleChange}
                />
              </DemoContainer>
            </LocalizationProvider>           
            <FormControl
              sx={{ my: 2 }}
              fullWidth={true}
            >
              <InputLabel id="multiple-checkbox-label">Rover</InputLabel>
              <Select
                labelId="multiple-checkbox-label"
                id="multiple-checkbox"
                multiple
                value={station}
                input={<OutlinedInput label="Rover"/>}
                onChange={handleSelectChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {stations.map((item) => (
                  <MenuItem key={item.id} value={item.stat}>
                    <Checkbox checked={station.indexOf(item.stat) > -1}/>
                    <ListItemText primary={item.zh}/>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={9} sx={{ mb: 2, height: "500px"}}>
                  <MyMap statList={station}/>
          </Grid>
        </Grid>
        <ImageGalleryIonMap folderName={folder} statList={station}/>
      </CardContent>
    </Card>    
  );
}

export default CardIondelay;