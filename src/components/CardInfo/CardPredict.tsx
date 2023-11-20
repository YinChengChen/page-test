import {
Card,
CardContent,
Typography,
Grid,
FormControl,
InputLabel,
MenuItem,
Box,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { PhotoAlbum, RenderPhoto, Photo } from "react-photo-album";
import { Lightbox } from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

const renderPhotoProps: RenderPhoto = ({
    imageProps: {title, ...restImageProps},
}) => (
    <div style={{
        position: "relative",
        width: "100%",
      }}>
        <img
        {...restImageProps}            
        />
        <div
      style={{
        position: "absolute",
        backgroundColor: "#0277bd",
        color: "#eee",
        fontWeight: "bold",
        padding: "3px 10px",
        bottom: "10px",
        left: "10px",
        borderRadius: "3px",
      }}
    >{title}</div>

    </div>
);


export default function CardPredict (){
    const cardTitle = "電漿泡事件預警";
    const [index, setIndex] = useState(-1);
    const images = [{
        imgUrl: "./data/predict/2023.075/site_distr.png",
        title: "Station Positions",
    },{
        imgUrl: "./data/predict/2023.075/hobeliu223075.png",
        title: "hobe-liu2",
    }];
    const initalPhotos: Photo[] = [];
    images.map((item) => {
        initalPhotos.push({
            src: item.imgUrl,
            width: 800,
            height: 450,
            title: item.title,
        })
    })
    return(
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom textAlign="center">
                    {cardTitle}
                </Typography>
                <hr/>
                <Box sx={{ mx: "auto", mt: 2}}>
        <PhotoAlbum
            photos={initalPhotos}
            layout="rows"
            padding={0}
            targetRowHeight={500}
            onClick={({ index }) => setIndex(index)}
            renderPhoto={renderPhotoProps}
        />
        <Lightbox
            slides={initalPhotos}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            plugins={[Fullscreen, Thumbnails, Zoom, Slideshow]}
        />
        </Box>
            </CardContent>
            
        </Card>
    )
}