import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import ImageGallery from "../ImageGallery/ImageGallery";

import ImageGalleryGif from "../ImageGallery/ImageGalleryGif";


export default function CardIndex() {
  const cardTitle = "GPS 相位失鎖指標";  
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom textAlign="center">
          {cardTitle}
        </Typography>
        <hr />
        <Typography variant="h6" textAlign="left" sx={{ my: 2 }}>
            GPS 訊號可能因劇烈太空天氣 (如電離層暴或磁暴)、訊號強度衰減 (如低層大氣散射)、遮蔽物(如飛機、建築物等) 產生載波相位失鎖的情形，以下顯示L2載波相位失鎖隨時間的變化，作為劇烈太空天氣的指標。衛星仰角設在30度以上，以排除低層大氣與其他遮蔽因素。指標寧靜期以藍紫色表示；中度擾動以黃綠色表示；強擾動以橘紅色表示。
        </Typography>
        <ImageGalleryGif/>
        {/* <ImageGallery/> */}
      </CardContent>
    </Card>
  );
}
