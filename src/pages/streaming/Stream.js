import React from 'react';
import ReactPlayer from 'react-player';
import './video.scss';

export default function Streaming({ url, refreshKey, playerRef }) {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

  return (
    <>
      <div className="player-wrapper mb-3">
        <ReactPlayer
          key={refreshKey}
          ref={playerRef}
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
    </>
  );
}
