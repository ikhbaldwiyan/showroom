import React from "react";
import ReactPlayer from "react-player";
import "../../style.scss";

export default function PlayerMulti({ url, refreshKey }) {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <ReactPlayer
      key={refreshKey}
      className="react-player-multi"
      config={{
        file: {
          forceHLS: !isSafari,
        },
      }}
      controls
      url={url}
      width="100%"
      height="auto"
      playing={true}
    />
  );
}
