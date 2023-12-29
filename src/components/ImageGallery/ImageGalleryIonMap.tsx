import { useEffect, useState, FC } from "react";
import { PhotoAlbum, RenderPhoto, Photo } from "react-photo-album";
import { Lightbox } from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { Box } from "@mui/material";
import { InsertInvitationOutlined } from "@mui/icons-material";
import { type } from "os";

interface componentProps {
    folderName: string;
    statList: string[];
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

const ImageGalleryIonMap: FC<componentProps> = ({ folderName, statList}) => {
    const [index, setIndex] = useState(-1);
    const initalPhotos: Photo[] = [];
    
    statList.map((item) => {
        initalPhotos.push({
            src: "./data/ion/" + folderName + "/ncku/" + item + ".png",
            width: 800,
            height: 600,
            title: item,
        })
    })
    return(
        <Box>
            <PhotoAlbum
                photos={initalPhotos}
                layout="masonry"
                padding={0}
                columns={4}
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
    );
}

export default ImageGalleryIonMap;