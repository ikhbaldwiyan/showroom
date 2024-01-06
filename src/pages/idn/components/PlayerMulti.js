import React from "react";
import ReactPlayer from "react-player";
import "../../streaming/video.scss";

export default function PlayerMulti({ url, number, refreshKey }) {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <div className="player-wrapper mb-3">
      <ReactPlayer
        key={refreshKey}
        className="react-player"
        config={{
          file: {
            forceHLS: !isSafari,
          },
        }}
        controls
        url={url}
        width="100%"
        height="width%"
        playing={true}
        muted={number != 1}
      />
    </div>
  );
}
