import { useEffect, useState } from "react";
import { PhotoAlbum, RenderPhoto, Photo } from "react-photo-album";
import { Lightbox } from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { Box } from "@mui/material";

interface folderName {
    name: string;
}

const renderPhotoProps: RenderPhoto = ({
    imageProps: { title, ...restImageProps },
  }) => (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <img {...restImageProps} />
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
      >
        {title}
      </div>
    </div>
  );

  const ImageGalleryGrd = ( folderName: folderName ) => {
    const [index, setIndex] = useState(-1);
    const initalPhotos: Photo[] = [];
    for (let i = 1; i<25; i++){
        initalPhotos.push({
            src: "./data/grd/" + folderName.name + "/gd" + i.toString().padStart(2, "0") + ".gif",
            width: 1000,
            height: 700,
            title: (i -1).toString().padStart(2, "0") + "UT"
        })
    }
    // console.log(initalPhotos);
    return (
        <Box sx={{ mx: "auto"}}>
            {/* @ts-ignore */}
            <PhotoAlbum
                photos={initalPhotos}
                layout="masonry"
                padding={0}
                columns={4}
                targetRowHeight={400}
                onClick={({index}) => setIndex(index)}
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
  }

  export default ImageGalleryGrd;