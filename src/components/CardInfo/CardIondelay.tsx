import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import LeafletMap from "../LeaflatMap/LeafletMap";
import MapComponent from "../LeaflatMap/MapComponent";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CardIondelay() {
    const cardTitle = "電離層延遲量";
    const [selectItem, setSelectItem] = useState("");
    const handleChange = (event: SelectChangeEvent) => {

    };
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom textAlign="center">
                    {cardTitle}
                </Typography>
                <hr/>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <MapComponent/>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ pt: 2}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker />
                    </LocalizationProvider>
                        <FormControl fullWidth>
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
                        </FormControl>
                        <Typography>
                            Lorem ipsum dolor sit amet.
                        </Typography>

                        </Box>
                    
                    </Grid>
                </Grid>
                
                {/* <LeafletMap/> */}
            </CardContent>
        </Card>
    );
}