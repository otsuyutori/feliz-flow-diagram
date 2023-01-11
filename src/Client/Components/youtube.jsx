import React from "react"
import YouTube from "react-youtube"

const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

const _onReady = function (event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
}

export const MyReactYouTube = ({ videoId }) => {
    return <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
}