import React from 'react';
import ReactPlayer from 'react-player';
import './video.scss';

export default function Streaming({url}) {
  return (
    <>
      <div className="player-wrapper mb-3">
        <ReactPlayer
          className="react-player"
          config={{
            file: {
              forceHLS: true,
            },
          }}
          controls
          url={url}
          width="100%"
          height="100%"
          playing={true}
          muted
        />
      </div>
    </>
  );
}