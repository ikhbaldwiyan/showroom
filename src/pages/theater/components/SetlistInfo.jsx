import { Loading } from "components";
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
          maxHeight: "220px",
          objectFit: "cover",
        }}
        alt="Banner"
        src={
          theater?.setlist?.image ??
          "https://static.showroom-live.com/image/room/cover/73f495d564945090f4af7338a42ce09ffa12d35fbfa8ce35c856220bcf96c5f3_m.png?v=1683304746"
        }
      />
      <CardBody
        style={{
          backgroundColor: "#008080",
          borderBottomRightRadius: "6px",
          borderBottomLeftRadius: "6px",
          padding: "15px",
        }}
      >
        <CardText style={{ fontWeight: "600" }}>
          {theater?.setlist?.description ?? (
            <Loading size={20} color="#ECFAFC" />
          )}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default SetlistInfo;
