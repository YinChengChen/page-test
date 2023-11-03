import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function CardIondelay() {
    const cardTitle = "電離層延遲量"
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom textAlign="center">
                    {cardTitle}
                </Typography>
            </CardContent>
        </Card>
    );
}