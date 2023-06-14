import React, { useState } from "react";
import { Player } from "video-react";
import { Box } from "@mui/material";
import "video-react/styles/scss/video-react.scss";
interface videoProps {
  poster: string,
  videoUrl: string
}
const ReactVideoGallery = (videoProps: videoProps) => {
  // let data = [
  //   {
  //     id: 1,
  //     poster: "./data/grid/grid_2023001.png",
  //     videoUrl: "./data/gif/output.mp4",
  //   },
  //   {
  //     id: 2,
  //     poster: "./data/grid/grid_2023001.png",
  //     videoUrl: "./data/gif/output.mp4",
  //   },
  //   {
  //     id: 3,
  //     poster: "./data/grid/grid_2023001.png",
  //     videoUrl: "./data/gif/output.mp4",
  //   },
  // ];
  return (
    <Box>
      {/* <h1 style={{ textAlign: "center" }}>Video Gallery</h1> */}
      <Player
        playsInline
        poster={videoProps.poster}
        src={videoProps.videoUrl}
        preload="metadata"
        muted
      >
        {/* <VolumeMenuButton vertical></VolumeMenuButton> */}
      </Player>
    </Box>
  );
};

export default ReactVideoGallery;
