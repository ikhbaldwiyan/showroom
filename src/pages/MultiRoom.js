import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";

import MainLayout from "./layout/MainLayout";
import Multi from "parts/Multi";
import Loading from "components/Loading";
import MultiMenu from "components/MultiMenu";
import AlertInfo from "components/AlertInfo";
import FarmStars from "components/FarmStars";

export default function MultiRoom(props) {
  const [layout, setLayout] = useState("6");
  const [loading, setLoading] = useState(false);
  const [hideMultiMenu, setHideMultiMenu] = useState(false);
  const [isFarming, setIsFarming] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [layout]);

  const isMultiRoom = layout === "4" || layout === "3" ? "isMultiRoom" : "";

  const propsMultiRoom = {
    hideMultiMenu,
    setHideMultiMenu,
    layout,
    setLayout,
    theme: props.theme,
    isFarming,
    setIsFarming,
  };

  return (
    <MainLayout title="Multi Room" {...props} isMultiRoom={isMultiRoom}>
      <Container fluid>
        <AlertInfo page="Multi Room" label="Multi Alert Info" />
        <MultiMenu {...propsMultiRoom} />
        <Row className="d-flex">
          <Multi {...propsMultiRoom} />
          {isFarming && layout !== "4" && layout !== "3" ? (
            <FarmStars {...propsMultiRoom} />
          ) : (
            <Multi {...propsMultiRoom} />
          )}
          {layout === "4" || layout == "3" ? (
            loading && layout !== "3" ? (
              <Loading />
            ) : isFarming && layout === "4" ? (
              <FarmStars {...propsMultiRoom} />
            ) : (
              <Multi {...propsMultiRoom} />
            )
          ) : (
            ""
          )}
          {layout === "3" &&
            (loading && layout !== "4" ? (
              <Loading />
            ) : (
              isFarming && layout === "3" ? (
                <FarmStars {...propsMultiRoom} />
              ) : (
                <Multi {...propsMultiRoom} />
              )
            ))}
        </Row>
      </Container>
    </MainLayout>
  );
}
