import React from "react";
import "./style.scss";
import MainLayout from "pages/layout/MainLayout";
import { Col, Row } from "reactstrap";
import ChatBuble from "./components/ChatBuble";
import SenderChat from "./components/SenderChat";

const PublicChat = () => {
  return (
    <MainLayout>
      <div className="layout">
        <Row>
          <Col md="7" sm="12">
            <ChatBuble
              avatar={
                "https://static.showroom-live.com/image/avatar/1042177.png?v=108"
              }
              username="Inzoid"
              message="Hello World"
            />
            <ChatBuble
              avatar={
                "https://static.showroom-live.com/image/avatar/1042177.png?v=108"
              }
              username="Inzoid"
              message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            />
            <ChatBuble
              avatar={
                "https://static.showroom-live.com/image/avatar/59.png?v=108"
              }
              username="Muvin"
              message="Lorem ipsum dolor sit amet"
            />
            <SenderChat
              avatar={
                "https://static.showroom-live.com/image/avatar/59.png?v=108"
              }
              username="Sender"
              message="Hallo guys"
            />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default PublicChat;
