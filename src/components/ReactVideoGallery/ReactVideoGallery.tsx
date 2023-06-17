import React, { useState } from "react";
import {
  Player,
  BigPlayButton,
  PlaybackRateMenuButton,
  ControlBar,
} from "video-react";
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
        muted
      >
        <BigPlayButton position="center" />
        <ControlBar>
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
        </ControlBar>
      </Player>
    </Box>
  );
};

export default ReactVideoGallery;
