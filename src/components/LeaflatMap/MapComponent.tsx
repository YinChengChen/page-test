import React from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box } from "@mui/material"

class MapComponent extends React.Component {
    componentDidMount(): void {
        const mymap = L.map("mapid").setView([23.57565, 120.9738819], 8);
        const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        L.tileLayer(OSMUrl).addTo(mymap);
    }

    render(){
        return (
            <Box sx={{ p: 2}}>
                <div id="mapid" style={{ height: "80vh", width: "100%"}}></div>
            </Box>            
        );
    }
}

export default MapComponent;