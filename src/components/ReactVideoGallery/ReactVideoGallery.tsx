import React, { useState } from "react";
import { Player } from "video-react";
import { Box } from "@mui/material";
import "video-react/styles/scss/video-react.scss";
interface videoProps {
  poster: string;
  videoUrl: string;
}
const ReactVideoGallery = (videoProps: videoProps) => {
  
  return (
    <Box>
  
      <Player
        playsInline
        poster={videoProps.poster}
        src={videoProps.videoUrl}
        preload="metadata"
        muted
      >
      </Player>
    </Box>
  );
};

export default ReactVideoGallery;
