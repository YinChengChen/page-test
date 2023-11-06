import { useEffect, useState } from "react";
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

// const fetchData = async (dp: string) => {
//     let res = await fetch(dp);
//     let pdata = await res.json();
//     return pdata;
// }

export default function CardIondelay() {
    const cardTitle = "電離層延遲量";
    const dp = "./pickerDate.json";
    const [value, setValue] = useState<Dayjs | null>(dayjs('2023-03-16'));
    const [dateList, setDateList] = useState("");    
    // const dateList = fetchData(dp);
    const [folder, setFolder] = useState("2023.075")
    
    // console.log(dateList);

    const fetchData = () => {
        fetch(dp).then(res => {
            return res.json();
        }).then(data => {
            setDateList(data);
        })
    }
    useEffect(() => {
        fetchData()
    }, [])

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
    
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom textAlign="center">
                    {cardTitle}
                </Typography>
                <hr/>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MapComponent/>
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2}}>
                            
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
            <DatePicker value={value} 
            // @ts-ignore
            onChange={handleChange} />
      </DemoContainer>
    </LocalizationProvider>
                            
                          
                            {/* <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectItem}
                            label="Age"
                            onChange={handleChange}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            </FormControl> */}
                        
                    </Grid>
                </Grid>
                <ImageGalleryIon name={folder} />
            </CardContent>
        </Card>
    );
}