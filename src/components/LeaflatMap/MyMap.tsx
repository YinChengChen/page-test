import { useState, useEffect, useRef, FC } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";

interface list {
    id: number,
    stat: string,
    lon: number,
    lat: number,
    zh: string,
}

interface componentProps {
  statList: string[];
}

const MyMap:FC<componentProps> = ({statList}) => {
    Leaflet.Icon.Default.imagePath="./images/";
    const [stats, setStats] = useState<list[]>([]);
    const requestAbortController = useRef<AbortController | null>(null);    
    const targets:list[] = [];
    function fetchData(){
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

    useEffect(()=>{
        fetchData()
        .then((result) => {
            statList.map((item) => {
              targets.push(result.find((r: list) => r.stat === item))
            })            
            setStats(targets);
        })
        return () => requestAbortController.current?.abort();
    }, [stats])

    return(   
        <MapContainer style={{ height: "100%", width: "100%"}} center={[23.57565, 120.9738819]} zoom={7}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {stats.map((item) => (
    <Marker position={[item.lat, item.lon]}>
      <Popup>
        <div>
          <p>代號:{item.stat}</p>
          <p>站名:{item.zh}</p>
        </div>
      </Popup>
    </Marker>
  ))}
</MapContainer>
    
    )
}

export default MyMap;