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

const ImageGalleryIon = (folderName: folderName) => {
  // console.log(folderName.name);
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState([]);
  const initalPhotos: Photo[] = [];

  const fetchImg = (ip: string) => {
    fetch(ip)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImages(data);
      });
  };
  useEffect(() => {
    const ip = "./data/ion/" + folderName.name + "/imglist.json";
    fetchImg(ip);
    return;
  }, [folderName]);
  images.map((item: string) => {
    initalPhotos.push({
      src: "./data/ion/" + folderName.name + "/" + item,
      width: 800,
      height: 600,
      title: item.slice(22, 26),
    });
  });

  return (
    <Box id="photoAlbum" sx={{ mx: "auto" }}>
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
};

export default ImageGalleryIon;
