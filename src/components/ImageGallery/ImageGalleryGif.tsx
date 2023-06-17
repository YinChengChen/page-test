import { PhotoAlbum, RenderPhoto, Photo } from "react-photo-album";
import { Lightbox } from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { Box } from "@mui/material"



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



export default function ImageGalleryGif(){
    const [index, setIndex] = useState(-1);
    const mm = [0, 10, 20, 30, 40, 50];
  const initalPhotos: Photo[] = [];
  mm.map((item) => {
    initalPhotos.push({
      src: "./data/lli/lli_202307516" + item.toString().padStart(2, "0") + ".gif",
      width: 800,
      height: 450,
      title: "16:" + item.toString().padStart(2, "0"),
    });
  });
    // console.log(initalPhotos);
    return(
        <Box sx={{ mx: "auto" }}>
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
    )
};