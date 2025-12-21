import React from "react";

const SenderChat = ({ avatar, username, message }) => {
  return (
    <div className="chat-wrapper sender">
      <div className="chat">
        <div className="name">
          <span>{username}</span>
          <span className="time">18:58</span>
        </div>
        <div className="box-sender">
          <span>{message}</span>
        </div>
      </div>
      <img width={48} height={48} src={avatar} />
    </div>
  );
};

export default SenderChat;
