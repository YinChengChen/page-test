import { useEffect, useState, useRef } from "react";
import { Badge, Card, CardContent, Typography, Grid, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import MapComponent from "../LeaflatMap/MapComponent";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import CalendarPicker from "../DataCalander/CalendarPicker";
import ImageGalleryIon from "../ImageGallery/ImageGalleryIon";
import { DatePicker } from "@mui/x-date-pickers";
import LeafletMap from "../LeaflatMap/LeafletMap";
import Calendar from "react-calendar";

type CValuePiece = Date | null;
type CValue = CValuePiece | [CValuePiece, CValuePiece];



export default function CardIondelay() {
    const cardTitle = "電離層延遲量";
    const dp = "./pickerDate.json";
    const [value, setValue] = useState<Dayjs>(dayjs('2023-03-16'));
    const [cvalue, setCvalue] = useState<CValue>(new Date());
    const [dateList, setDateList] = useState("");    
    // const dateList = fetchData(dp);
    const [folder, setFolder] = useState("2023.075")
    const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
    
    // console.log(dateList);
    const fetchCurrentList = () => {
        return fetch(dp).then((response) => {
            return response.json()
        }).then((data) => {
            return data
        })
    }

    const fetchList = async () => {
        const currentData = await Promise.all([
            fetchCurrentList()
        ])
        
        setDateList(...currentData);
    }
    
    const handleChange = (value: Dayjs) => {
        let y = value?.get('year');
        //@ts-ignore
        let m = value?.get('month') + 1;
        let d = value?.get('date');
        //@ts-ignore
        const target = dateList.filter((item) => {
            if (item.year === y && item.month === m && item.day === d){
                setFolder(item.doy);
            } 
        });
    }
    
    function fetchData(date: Dayjs, { signal }: { signal: AbortSignal}) {
        return new Promise<{ daysToHighLight: number[]}>((resolve, reject) => {
            const timeout = setTimeout(() => {
                const monthOfDate = date.month() + 1;
                const yearOfDate = date.year();
                // const datePickerList = return new Promise<{}>(( resolve, reject) => {})
                // const datePickerList = fetch(dp).then((response) => {
                //     return response.json()
                // })
                console.log(dateList)
                //@ts-ignore
                const daysToHighLight = dateList.map((item: any) => {
                    if (item.month === monthOfDate && item.year === yearOfDate){
                        return item.day
                    }
                })
                resolve({ daysToHighLight });
            }, 500);
            signal.onabort = () => {
                clearTimeout(timeout);
                reject(new DOMException('aborted', 'AbortError'));
            }
        })
        
    }

    function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
        
        const isSelected =
          !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
      
        return (
          <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? '🌚' : undefined}
          >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
          </Badge>
        );
    }

    const fetchHighLightedDays = (date: Dayjs) => {
        const controller = new AbortController();
        fetchData(date, {
            signal: controller.signal,
        }).then(({ daysToHighLight }) => {
            setHighlightedDays(daysToHighLight);
            setIsLoading(false)
        }).catch((error) => {
             // ignore the error if it's caused by `controller.abort`
            if (error.name !== 'AbortError') {
                throw error;
            }
        })

        requestAbortController.current = controller;
    }

    useEffect(() => {
        fetchList();
        fetchHighLightedDays(value);
        // abort request on unmount
        return () => requestAbortController.current?.abort();
    }, [])


    const handleMonthChange = (date: Dayjs) => {
        
    }
    
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom textAlign="center">
                    {cardTitle}
                </Typography>
                <hr/>
                <Grid container spacing={2}>
                   
                    <Grid item xs={12} sx={{ mb: 2}}>
                            
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
            <DatePicker value={value}
            loading={isLoading}
            slots={{
                day: ServerDay,
            }}
            slotProps={{
                day: {
                    highlightedDays,
                } as any
            }}
            // @ts-ignore
            onChange={handleChange} />
      </DemoContainer>
    </LocalizationProvider>                        
    <div>
        <Calendar onChange={setCvalue} value={cvalue}/>
    </div>
                    </Grid>
                </Grid>
                <ImageGalleryIon name={folder} />
            </CardContent>
        </Card>
    );
}
