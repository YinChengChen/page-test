import { useState, useCallback } from "react";

import { PhotoAlbum, RenderPhoto } from "react-photo-album";
import { Lightbox } from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import photos from "./photos";

const renderPhotoProps: RenderPhoto = ({
  imageProps: { title, alt, style, ...restImageProps },
}) => (
  <div
    style={{
      border: "1px solid #eee",
      borderRadius: "8px",
      padding: "15px",
      backgroundColor: "#0d47a1",
      position: "relative",
    }}
  >
    <img
      alt={alt}
      style={{ ...style, width: "100%", padding: 0, borderRadius: 4 }}
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
    >
      {title}
    </div>
  </div>
);

export default function ImageGallery() {
  const [index, setIndex] = useState(-1);
  console.log(photos)
  return (
    <>
      <PhotoAlbum
        photos={photos}
        padding={20}
        layout="rows"
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
        // @ts-ignore
        renderPhoto={renderPhotoProps}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Thumbnails, Zoom, Slideshow]}
      />
    </>
  );
}
