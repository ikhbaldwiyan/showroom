import MainLayout from "pages/layout/MainLayout";
import ModalInfo from "parts/ModalInfo";
import React, { useState } from "react";
import { FaAndroid, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button, Col, Row, Collapse, Card, CardBody } from "reactstrap";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";

const Android = () => {
  const [open, setOpen] = useState("4");

  const handleDownload = () => {
    window.open(process.env.REACT_APP_ANDROID_LINK, "_blank");
    gaTag({
      action: "download_apk_link",
      category: "Download",
      label: "Android",
      username: getSession()?.profile?.name ?? "Guest"
    });
  };

  const toggle = (id) => {
    setOpen(open === id ? "" : id);
  };

  const renderChevron = (id) => {
    return open === id ? <FaChevronUp /> : <FaChevronDown />;
  };

  return (
    <MainLayout title="Download APK">
      <ModalInfo />
      <div className="layout">
        <h4>DOWNLOAD JKT48 SHOWROOM APK</h4>
        <div className="py-1">
          <Row>
            <Col md="8" sm="12">
              <img
              className="rounded"
                src="https://res.cloudinary.com/dkkagbzl4/image/upload/v1721376518/jqomhi5tiwgdcjrrthq5.png"
                alt="Preview Beta Test APK"
                width="100%"
              />
            </Col>
          </Row>

          <div className="accordion mt-3">
            <Card className="p-2" color="dark">
              <div
                onClick={() => toggle("1")}
                className="accordion-header d-flex justify-content-between align-items-center"
              >
                <h6>JKT48 Showroom v1.0 APK (14 April 2024)</h6>
                {renderChevron("1")}
              </div>
              <Collapse isOpen={open === "1"}>
                <CardBody className="p-2" color="dark">
                  <ul>
                    <li>Home</li>
                    <li>Login</li>
                    <li>Recent Lives</li>
                    <li>Showroom Live</li>
                    <li>IDN Live</li>
                    <li>Premium Live</li>
                    <li>Room Live Tabs</li>
                    <li>Live Chat Tabs</li>
                    <li>Theater Schedule List and Detail</li>
                    <li>Podium Showroom and IDN</li>
                    <li>Send comment showroom</li>
                    <li>Refresh button live streaming showroom</li>
                  </ul>
                </CardBody>
              </Collapse>
            </Card>
            <Card className="p-2" color="dark">
              <div
                onClick={() => toggle("2")}
                className="accordion-header d-flex justify-content-between align-items-center"
              >
                <h6>JKT48 Showroom v1.1 APK (27 Mei 2024)</h6>
                {renderChevron("2")}
              </div>
              <Collapse isOpen={open === "2"}>
                <CardBody className="p-2" color="dark">
                  <ul>
                    <li>Add new Member List Screen</li>
                    <li>Add Live Notification Showroom and IDN Live</li>
                    <li>Improve and optimize switch room live stream</li>
                    <li>
                      Add Profile and History Live tab in member room detail
                    </li>
                    <li>Show follow member room button</li>
                    <li>
                      Show songs tab for schedule theater detail and premium
                      live
                    </li>
                    <li>Handle auto refresh if streaming showroom lag</li>
                    <li>Implement modal logout and login header</li>
                    <li>Add register account link redirect to webpage</li>
                    <li>Show some new icon for login and theater schedule</li>
                    <li>Update theater schedule by newest data</li>
                    <li>Show pop up reminder alert update APK</li>
                  </ul>
                </CardBody>
              </Collapse>
            </Card>
            <Card className="p-2" color="dark">
              <div
                onClick={() => toggle("3")}
                className="accordion-header d-flex justify-content-between align-items-center"
              >
                <h6>JKT48 Showroom v1.2 APK (18 Juni 2024)</h6>
                {renderChevron("3")}
              </div>
              <Collapse isOpen={open === "3"}>
                <CardBody className="p-0 p-lg-2" color="dark">
                  <ul>
                    <li>Add New User Profile menu</li>
                    <li>Add About project tab menu</li>
                    <li>Add Switch Dark Mode background theme</li>
                    <li>Implement Full screen Showroom & IDN Live</li>
                    <li>Revamp UI header Showroom live</li>
                    <li>Change status bar color to dark theme</li>
                    <li>Add IDN Live List screen</li>
                    <li>Add Refresh button in IDN Live streaming</li>
                    <li>Fix duplicate podium name</li>
                  </ul>
                </CardBody>
              </Collapse>
            </Card>
            <Card className="p-2" color="info">
              <div
                onClick={() => toggle("4")}
                className="accordion-header d-flex justify-content-between align-items-center"
              >
                <h6>JKT48 Showroom v1.3 APK (20 July 2024)</h6>
                {renderChevron("4")}
              </div>
              <Collapse isOpen={open === "4"}>
                <CardBody className="p-0 p-lg-2" color="info">
                  <ul>
                    <li>Add Rank menu in live stream tabs</li>
                    <li>Add Settings Tab in Profile</li>
                    <li>Show social media info on About screen</li>
                    <li>Set default to dark mode background theme</li>
                    <li>Update some wording title to indonesia</li>
                    <li>Show Delete Account button on settings</li>
                    <li>Change Splash Screen and APK name to JKT48 Showroom Fanmade</li>
                  </ul>
                </CardBody>
              </Collapse>
            </Card>
          </div>
        </div>
        <div className="my-2">
          <Button onClick={handleDownload} size="md" color="success">
            <div className="d-flex">
              Download APK <FaAndroid className="ml-2" size={30} />
            </div>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Android;
