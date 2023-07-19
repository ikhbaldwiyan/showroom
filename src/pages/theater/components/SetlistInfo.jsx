import React from "react";
import { Card, CardBody, CardText } from "reactstrap";

const SetlistInfo = () => {
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
        src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2020/11/16/9189132f-a408-412d-a11d-f1cb41505c10-1605500712740-a8b264aa7dff3d998ae581d3fbbaf233.jpg"
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
          Pernahkah kamu meminum Ramune? Meskipun tidak bisa diminum sekaligus,
          tapi Ramune tetap dapat kita rasakan kesegarannya dalam setiap
          tetesnya. Seperti nikmatnya Ramune tersebut, para member JKT48 New Era
          siap untuk memberikanmu keceriaan dan semangat baru, melalui setiap
          lagu yang ada
        </CardText>
      </CardBody>
    </Card>
  );
};

export default SetlistInfo;
