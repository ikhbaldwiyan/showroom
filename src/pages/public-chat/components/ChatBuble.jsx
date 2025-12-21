import React from "react";

const ChatBuble = ({ avatar, username, message }) => {
  return (
    <div className="chat-wrapper">
      <img width={48} height={48} src={avatar} />
      <div className="chat">
        <div className="name">
          <span>{username}</span>
          <span className="time">18:58</span>
        </div>
        <div className="box">
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatBuble;
