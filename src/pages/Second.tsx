import { Box } from "@mui/material";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import ReactVideoGallery from "../components/ReactVideoGallery/ReactVideoGallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
// import ImageGallery from "../components/ImageGallery/ImageGallery";
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
export default function Second() {
  return (
    <Box sx={{ mt: 12, mx: "auto", maxWidth: 1080 }}>
      <ImageGallery />
    </Box>
  );
}
