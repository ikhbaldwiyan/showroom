import React from "react";
import { Button, Col, Row } from "reactstrap";
import { RiGlobalLine } from "react-icons/ri";
import { AiFillAppstore } from "react-icons/ai";
import { IoSchoolSharp } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { getSession } from "utils/getSession";

function FilterRoomList({
  allMember,
  isAcademy,
  isRegular,
  setIsAcademy,
  setAllMember,
  setIsRegular,
  isLive,
  setIsLive
}) {
  const filterAllMember = () => {
    setIsRegular(false);
    setAllMember(true);
    setIsAcademy(false);
    setIsLive(false);
  };

  const filterAcademy = () => {
    setIsAcademy(true);
    setAllMember(false);
    setIsRegular(false);
    setIsLive(false);
  };

  const filterRegular = () => {
    setIsRegular(true);
    setAllMember(false);
    setIsAcademy(false);
    setIsLive(false);
  };

  const filterIsLive = () => {
    setIsLive(true);
    setIsRegular(false);
    setAllMember(false);
    setIsAcademy(false);
  };

  const button = [
    {
      name: "ALL",
      action: filterAllMember,
      state: allMember,
      color: "danger",
      icon: <AiFillAppstore className="mr-1" />
    },
    {
      name: "TRAINEE",
      action: filterRegular,
      state: isRegular,
      icon: <IoSchoolSharp className="mr-1" />,
      style: { backgroundColor: "teal", border: "none" }
    },
    {
      name: "GEN 10",
      action: filterAcademy,
      state: isAcademy,
      color: "info",
      icon: <RiGlobalLine className="mr-1" />
    }
  ];

  return (
    <Row className="mb-2">
      <Col className="d-flex">
        {button.map((item, idx) => (
          <Button
            key={idx}
            size="sm"
            className="mr-1"
            color={item.color}
            onClick={item.action}
            style={item.style}
            disabled={item.state ? "disabled" : ""}
          >
            {item.icon} <span className="text-filter">{item.name}</span>
          </Button>
        ))}
        {getSession().session && (
          <Button
            size="sm"
            className="mr-1"
            onClick={filterIsLive}
            disabled={isLive ? "disabled" : ""}
            color="primary"
          >
            <span className="text-filter mx-1">
              <HiUserGroup size={20} />
            </span>
          </Button>
        )}
      </Col>
    </Row>
  );
}

export default FilterRoomList;
