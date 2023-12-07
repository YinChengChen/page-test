import { useEffect, useState, useRef } from "react";
import { Badge, Card, CardContent, Typography, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { DatePicker } from "@mui/x-date-pickers";
import ImageGalleryGrd from "../ImageGallery/ImageGalleryGrd";

interface MatrixItem {
  year: number;
  month: number;
  day: number;
  doy: string;
}

export default function CardEvents(){
  const cardTitle = "GPS 電離層擾動測報";
  // const today = dayjs(new Date());
  // const [value] = useState<Dayjs>(today.subtract(2, "M"));
  const [value] = useState<Dayjs>(dayjs("2023-09-01"));
  const [dateList, setDateList] = useState<MatrixItem[]>([]);
  const dp = "./pickerDate.json";
  const [folder, setFolder] = useState("20230901");
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]); 

  const handleChange = (value: Dayjs) => {
    let y = value?.get("year");
    //@ts-ignore
    let m = value?.get("month") + 1;
    let d = value?.get("date");
    //@ts-ignore
    dateList.filter((item) => {
      if (item.year === y && item.month === m && item.day === d) {
        setFolder(y + m.toString().padStart(2, "0") + d.toString().padStart(2, "0"));
      }
    });
  };

  function fetchList() {
    // const dp = "./pickerDate.json";
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

  useEffect(() => {
    fetchHighLightedDays(value);
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

  return(
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom textAlign="center">
          {cardTitle}
        </Typography>
        <hr />
        <Typography variant="h6" textAlign="left">
             圖中為不同GPS衛星觀測電離層梯度隨時間的變化。電離層梯度為電離層延遲量與相應兩面測站基線長度之比。基線長限制在
             50
             公里，因此北中南各挑選五股(wuku)、清水(chin)、成大(ncku)站為基站，搭配氣象局其他地面追蹤站組成網格狀分布。梯度值可分為寧靜期(藍紫色帶)、中度擾動(黃綠色帶)和強擾動(橘紅色帶)供使用者參考。
           </Typography>
        <Grid container spacing={2}>
          <Grid item sx={{ my: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
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
          </Grid>
        </Grid>
        <ImageGalleryGrd name={folder} />
      </CardContent>
    </Card>
  )
}

// interface MatrixItem {
//   year: number;
//   month: number;
//   day: number;
//   doy: string;
// }

// export default function CardEvents() {

//   const cardTitle = "GPS 電離層擾動測報";
//   const today = dayjs(new Date());
//   const [value] = useState<Dayjs>(today.subtract(2, "M"));
//   const [dateList, setDateList] = useState<MatrixItem[]>([]);
//   const dp = "./pickerDate.json";
//   const [folder, setFolder] = useState("2023.244");
//   const requestAbortController = useRef<AbortController | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]); 

//   const handleChange = (value: Dayjs) => {
//     let y = value?.get("year");
//     //@ts-ignore
//     let m = value?.get("month") + 1;
//     let d = value?.get("date");
//     //@ts-ignore
//     dateList.filter((item) => {
//       if (item.year === y && item.month === m && item.day === d) {
//         setFolder(item.doy);
//       }
//     });
//   };

//   function fetchList() {
//     // const dp = "./pickerDate.json";
//     return fetch(dp)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((result) => {
//         return result;
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error);
//         throw error;
//       });
//   }

//   function fetchData(
//     date: Dayjs,
//     dateList: any[],
//     { signal }: { signal: AbortSignal }
//   ) {
//     return new Promise<{ daysToHighLight: number[] }>((resolve, reject) => {
//       const timeout = setTimeout(() => {
//         const monthOfDate = date.month() + 1;
//         const yearOfDate = date.year();
//         //@ts-ignore
//         // const daysToHighLight = [1, 9, 26];
//         const daysToHighLight: any[] = [];
//         dateList.forEach((item) => {
//           if (item.month === monthOfDate && item.year === yearOfDate) {
//             daysToHighLight.push(item.day);
//           }
//         });
//         resolve({ daysToHighLight });
//       }, 500);
//       signal.onabort = () => {
//         clearTimeout(timeout);
//         reject(new DOMException("aborted", "AbortError"));
//       };
//     });
//   }

//   function ServerDay(
//     props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
//   ) {
//     const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

//     const isSelected =
//       !props.outsideCurrentMonth &&
//       highlightedDays.indexOf(props.day.date()) >= 0;

//     return (
//       <Badge
//         key={props.day.toString()}
//         overlap="circular"
//         badgeContent={isSelected ? "🟡" : undefined}
//       >
//         <PickersDay
//           {...other}
//           outsideCurrentMonth={outsideCurrentMonth}
//           day={day}
//         />
//       </Badge>
//     );
//   }

//   const fetchHighLightedDays = (date: Dayjs) => {
//     const controller = new AbortController();
//     fetchList()
//       .then((result) => {
//         setDateList(result);
//         return fetchData(date, result, {
//           signal: controller.signal,
//         });
//       })
//       .then(({ daysToHighLight }) => {
//         setHighlightedDays(daysToHighLight);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         // ignore the error if it's caused by `controller.abort`
//         if (error.name !== "AbortError") {
//           throw error;
//         }
//       });

//     requestAbortController.current = controller;
//   };

//   useEffect(() => {
//     fetchHighLightedDays(value);
//     // abort request on unmount
//     return () => requestAbortController.current?.abort();
//   }, []);

//   const handleMonthChange = (date: Dayjs) => {
//     if (requestAbortController.current) {
//       // make sure that you are aborting useless requests
//       // because it is possible to switch between months pretty quickly
//       requestAbortController.current.abort();
//     }

//     setIsLoading(true);
//     setHighlightedDays([]);
//     fetchHighLightedDays(date);
//   };

//   const handleYearChange = (date: Dayjs) => {
//     if (requestAbortController.current) {
//       // make sure that you are aborting useless requests
//       // because it is possible to switch between months pretty quickly
//       requestAbortController.current.abort();
//     }
//     setIsLoading(true);
//     setHighlightedDays([]);
//     fetchHighLightedDays(date);
//   };
//   };
//   return (
   
//         
//          <Box sx={{ display: "flex", my: 2 }} gap={2}>
//           <Typography variant="h6" textAlign="left">
//             圖中為不同GPS衛星觀測電離層梯度隨時間的變化。電離層梯度為電離層延遲量與相應兩面測站基線長度之比。基線長限制在
//             50
//             公里，因此北中南各挑選五股(wuku)、清水(chin)、成大(ncku)站為基站，搭配氣象局其他地面追蹤站組成網格狀分布。梯度值可分為寧靜期(藍紫色帶)、中度擾動(黃綠色帶)和強擾動(橘紅色帶)供使用者參考。
//           </Typography>
//         </Box>
      
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DemoContainer components={['DateTimeField']}>
//                   <DateTimePicker
//                     ampm={false}
//                     label="Month/Day/Year"
//                     views={["year", "month", "day"]}
//                     value={value}
//                     onChange={(newValue)=>{setValue(newValue)}}
//                     format="L"
//                   />                  
//                 </DemoContainer>
//               </LocalizationProvider> 
          
  
//   );
// }
