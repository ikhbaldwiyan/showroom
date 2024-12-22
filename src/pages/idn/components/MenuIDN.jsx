import React, { useState } from "react";
import { FaThList } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import CommentIDN from "./CommentIDN";
import RoomListIDN from "./RoomListIDN";

const MenuIDN = ({ id, live }) => {
  const [activeTab, setActiveTab] = useState("2");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <Nav
        tabs
        style={{
          borderRadius: "8px",
          borderBottom: "none"
        }}
      >
        <NavItem>
          <NavLink
            onClick={() => toggleTab("1")}
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              cursor: "pointer",
              padding: "6px 14px",
              marginLeft: "0px",
              backgroundColor: activeTab === "1" ? "#3182CE" : "#4A5568",
              border: activeTab === "1" ? "2px solid #63B3ED" : "none",
              borderRadius: "8px",
              margin: "0 4px",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            <FaThList size={16} />
            Room
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => toggleTab("2")}
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              cursor: "pointer",
              padding: "6px 14px",
              backgroundColor: activeTab === "2" ? "#3182CE" : "#4A5568",
              border: activeTab === "2" ? "2px solid #63B3ED" : "none",
              borderRadius: "8px",
              margin: "0 4px",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            <IoChatboxEllipses size={18} />
            Comment
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="mt-3">
        <TabPane tabId="1">
          <RoomListIDN currentRoom={live?.user?.username} />
        </TabPane>
        <TabPane tabId="2">
          <CommentIDN
            id={id}
            slug={live?.slug}
            username={live?.user?.username}
          />
        </TabPane>
      </TabContent>
    </>
  );
};

export default MenuIDN;
