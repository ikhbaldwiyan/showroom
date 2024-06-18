import MainLayout from "pages/layout/MainLayout";
import React from "react";
import { FaAndroid } from "react-icons/fa";
import { Button, Col, Row } from "reactstrap";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";

const Android = () => {
  const handleDownload = () => {
    window.open(process.env.REACT_APP_ANDROID_LINK, "_blank");
    gaTag({
      action: "download_apk_link",
      category: "Download",
      label: "Android",
      username: getSession()?.profile?.name ?? "Guest"
    });
  };

  return (
    <MainLayout title="Download APK">
      <div className="layout">
        <h4>DOWNLOAD JKT48 SHOWROOM APK</h4>
        <div className="py-1">
          <Row>
            <Col md="8" sm="12">
              <img
                src="https://res.cloudinary.com/dkkagbzl4/image/upload/v1716661437/jrqhln1sn8udthxvfach.png"
                alt="Preview Beta Test APK"
                width="100%"
              />
            </Col>
          </Row>

          <p className="mt-3">
            <b>Release Notes JKT48 Showroom v1.0 APK (14 April 2024)</b>
          </p>
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

          <p className="mt-3">
            <b>Release Notes JKT48 Showroom v1.1 APK (27 Mei 2024)</b>
          </p>
          <ul>
            <li>Add new Member List Screen</li>
            <li>Add Live Notification Showroom and IDN Live</li>
            <li>Improve and optimize switch room live stream</li>
            <li>Add Profile and History Live tab in member room detail</li>
            <li>Show follow member room button</li>
            <li>Show songs tab for schedule theater detail and premium live</li>
            <li>Handle auto refresh if streaming showroom lag</li>
            <li>Implement modal logout and login header</li>
            <li>Add register account link redirect to webpage</li>
            <li>Show some new icon for login and theater schedule</li>
            <li>Update theater schedule by newest data</li>
            <li>Show pop up reminder alert update APK</li>
          </ul>
          <p className="mt-3">
            <b>Release Notes JKT48 Showroom v1.2 APK (18 Juni 2024)</b>
          </p>
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
        </div>
        <div className="mb-3">
          <Button onClick={handleDownload} size="md" color="success">
            Download APK <FaAndroid className="ml-2" size={30} />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Android;
