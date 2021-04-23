import React from 'react';
import ReactPlayer from 'react-player';
import './video.scss';

export default function Streaming({url}) {
  // const darkMode = document.body.style = 'background: #2c2f33; color: white';

  return (
    <div className="player-wrapper">
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
      />
    </div>
  );
}