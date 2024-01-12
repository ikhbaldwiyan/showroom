import React from "react";
import ReactPlayer from "react-player";
import "../../streaming/video.scss";

export default function PlayerMulti({ url, number, idnUrl, refreshKey }) {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <div className="idn-live player-wrapper mb-3">
      <div className="logo-multi shadow-lg">
        <a href={idnUrl} target="_blank" rel="noreferrer">
          <img
            className="multi mt-1"
            width={60}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/IDN_Live.svg/1024px-IDN_Live.svg.png"
            alt="idn live"
          />
        </a>
      </div>
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
