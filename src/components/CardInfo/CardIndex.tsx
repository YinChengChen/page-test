import { Box, Card, CardContent, Typography, Badge } from "@mui/material";
import ImageGalleryGif from "../ImageGallery/ImageGalleryGif";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/zh-cn';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState, useEffect, useRef } from "react";

interface MatrixItem {
  year: number;
  month: number;
  day: number;
  doy: string;
}

export default function CardIndex() {
  const cardTitle = "GPS 相位失鎖指標";
  const dp = "./pickerDate.json";
  const [dateList, setDateList] = useState<MatrixItem[]>([]);
  const [value, setValue] = useState<Dayjs>(dayjs('2023-01-01T15:00'));
  const [folder, setFolder] = useState("2023.001");
  const [hours, setHours] = useState(15);
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  function fetchList(){
    return fetch(dp).then((response) => {
      if (!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }).then((result) => {
      return result;
    }).catch((error) => {
      console.log("Fetch error:", error);
      throw error;
    })
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
        console.log(daysToHighLight);
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

  useEffect(() => {
    fetchHighLightedDays(value);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleChange = (value: Dayjs) => {
    let y = value?.get("year");
    let m = value?.get('month') + 1;
    let d = value?.get('date');
    let h = value?.get('hour');
    // console.log(y,m , d , h);
    dateList.filter((item) => {
      if (item.year === y && item.month === m && item.day === d) {
        setFolder(item.doy);
      }
    })
    setHours(h);
  }

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighLightedDays(date);
    console.log("Month");
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
    console.log("Year");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom textAlign="center">
          {cardTitle}
        </Typography>
        <hr />
        <Typography variant="h6" textAlign="left" sx={{ my: 2 }}>
          GPS 訊號可能因劇烈太空天氣 (如電離層暴或磁暴)、訊號強度衰減
          (如低層大氣散射)、遮蔽物(如飛機、建築物等)
          產生載波相位失鎖的情形，以下顯示L2載波相位失鎖隨時間的變化，作為劇烈太空天氣的指標。衛星仰角設在30度以上，以排除低層大氣與其他遮蔽因素。指標寧靜期以藍紫色表示；中度擾動以黃綠色表示；強擾動以橘紅色表示。
        </Typography>
        <Box sx={{ pb: 2}}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='zh-cn'>
                <DemoContainer components={['DateTimeField']}>
                  <DateTimePicker
                    ampm={false}
                    ampmInClock={false}                    
                    label="Month/Day/Year Hour(UT)"
                    views={["year", "month", "day", "hours"]}
                    value={value}
                    loading={isLoading}
                    renderLoading={()=> <DayCalendarSkeleton/>}
                    format="L HH:00"
                    onMonthChange={handleMonthChange}
                    onYearChange={handleYearChange}
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
        </Box>
        <ImageGalleryGif folder={folder} hour={hours} />
      </CardContent>
    </Card>
  );
}
