import React from "react";
import ReactPlayer from "react-player";
import "../../streaming/video.scss";
import { HiUsers } from "react-icons/hi";
import { isMobile } from "react-device-detect";

export default function Player({ url, views, idnUrl, refreshKey }) {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <div className="idn-live player-wrapper mb-3">
      <div className="logo">
        <a href={idnUrl} target="_blank" rel="noreferrer">
          <img
            className="mt-1"
            width={isMobile ? 60 : 90}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/IDN_Live.svg/1024px-IDN_Live.svg.png"
            alt="idn live"
          />
        </a>
      </div>
      <div className="views">
        <div className="d-flex align-items-center">
          <HiUsers size={20} className="mr-1" />
          <b>{views}</b>
        </div>
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
        height="100%"
        playing={true}
      />
    </div>
  );
}
