import React from "react";
import { Card, CardBody, CardText } from "reactstrap";

const SetlistInfo = ({ theater }) => {
  return (
    <Card
      className="mt-1 mb-3"
      style={{
        border: "none",
        borderRadius: "6px",
      }}
    >
      <img
        style={{
          borderTopRightRadius: "6px",
          borderTopLeftRadius: "6px",
        }}
        alt="Banner"
        src={theater?.setlist.image}
      />
      <CardBody
        style={{
          backgroundColor: "#008080",
          borderBottomRightRadius: "6px",
          borderBottomLeftRadius: "6px",
          padding: "15px",
          height: "300px",
        }}
      >
        <CardText style={{ fontWeight: "600" }}>
          {theater?.setlist?.description}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default SetlistInfo;
