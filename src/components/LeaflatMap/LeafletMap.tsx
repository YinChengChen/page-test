import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box } from "@mui/material";

interface folderName {
  name: string;
}

interface position {
  stat: string;
  lat: number;
  lon: number;
}

const LeafletMap = (folder: folderName) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const stip = "./stat.json";
  const [stations, setStations] = useState([]);
  const [urls, setUrls] = useState([]);
  const markers: position[] = [];
  const [mkPos, setMkPos] = useState<position[]>([]);
  const [lon] = useState(120.9738819);
  const [lat] = useState(23.57565);
  const [zoom] = useState(8);
  const markerOptions = {
    radius: 4,
    fillColor: "#FF0000",
    color: "#FFFFFF",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };
  // const fetchStat = (ip: string, ioip: string) => {
  //     fetch(ip).then(res => {
  //         return res.json();
  //     }).then(data => {
  //         setStations(data);
  //     })
  //     fetch(ioip).then(res => {
  //         return res.json();
  //     }).then(data => {
  //         setUrls(data);
  //     })
  // }
  const fetchPos = async (sip: string, uip: string) => {
    let res = await fetch(sip);
    let sdata = await res.json();
    res = await fetch(uip);
    let udata = await res.json();

    // console.log(sdata);
    udata.map((item: string) => {
      let tmp = item.slice(22, 26);
      //@ts-ignore
      let pos = sdata.filter((item) => item.stat === tmp);
      markers.push({
        stat: tmp,
        lat: pos.lat,
        lon: pos.lon,
      });
    });
    setMkPos(markers);
  };

  useEffect(() => {
    const ioip = "./data/ion/" + folder.name + "/imglist.json";
    const fetchPos = async (sip: string, uip: string) => {
      let res = await fetch(sip);
      let sdata = await res.json();
      res = await fetch(uip);
      let udata = await res.json();

      // console.log(sdata);
      udata.map((item: string) => {
        let tmp = item.slice(22, 26);
        //@ts-ignore
        let pos = sdata.filter((item) => item.stat === tmp);
        markers.push({
          stat: tmp,
          lat: pos.lat,
          lon: pos.lon,
        });
      });
      setMkPos(markers);
    };
    // fetchPos(stip, ioip);
    // console.log(mkPos);
    //@ts-ignore
    map.current = L.map(mapContainer.current).setView([lat, lon], zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      //@ts-ignore
    }).addTo(map.current);

    const markerOptions = {
      radius: 4,
      fillColor: "#FF0000",
      color: "#ffffff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };
    //@ts-ignore
    // let popups = L.popup().setLatLng([lat, lon]).addTo(map.current)
    const markerLayer = L.geoJSON(mkPos, {
      pointToLayer: function (feature) {},
    });

    //@ts-ignore
    map.current.on("load", fetchPos(stip, ioip));
    return () => {
      //@ts-ignore
      map.current.remove();
    };
    //@ts-ignore
    // mapRef.current = L.map("map", {
    //     center: [23.57565, 120.9738819],
    //     zoom: 8,
    //     layers: [
    //         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    //
    //         })
    //     ]
    // })
  }, [lat, lon, zoom]);
  return (
    <div style={{ height: "75vh", width: "100%" }} ref={mapContainer}></div>
    // <div id="map" style={{ height: "75vh", width: "100%"}}></div>
  );
};

export default LeafletMap;
