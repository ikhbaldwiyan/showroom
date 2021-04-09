import React from 'react';
import ReactPlayer from 'react-player';
import './video.scss';
import Title from 'pages/jeketi/Title';

export default function Streaming({url, roomId}) {
  // const darkMode = document.body.style = 'background: #2c2f33; color: white';

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
        />
      </div>
      <Title roomId={roomId} />
    </>
  );
}