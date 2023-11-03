import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import LeafletMap from "../LeaflatMap/LeafletMap";
import MapComponent from "../LeaflatMap/MapComponent";
export default function CardIondelay() {
    const cardTitle = "電離層延遲量"
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
                        <Typography>
                            Lorem ipsum dolor sit amet.
                        </Typography>
                    </Grid>
                </Grid>
                
                {/* <LeafletMap/> */}
            </CardContent>
        </Card>
    );
}