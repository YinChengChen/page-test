import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";

interface list {
    stat: string,
    lon: number,
    lat: number,
}

const MyMap = () => {
    Leaflet.Icon.Default.imagePath="./images/";
    const [stats, setStats] = useState<list[]>([]);
    const requestAbortController = useRef<AbortController | null>(null);    
    
    function fetchData(){
        return fetch("./stat.json")
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

    useEffect(()=>{
        fetchData()
        .then((result) => {
            setStats(result);
        })
        return () => requestAbortController.current?.abort();
    }, [])

    return(   
        <MapContainer style={{ height: "100%", width: "100%"}} center={[23.57565, 120.9738819]} zoom={7}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {stats.map((item) => (
    <Marker position={[item.lat, item.lon]}></Marker>
  ))}
</MapContainer>
    
    )
}

export default MyMap;