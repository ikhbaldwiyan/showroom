import React from "react";
import SummerTour from "../assets/images/summer-tour-banner.png";
import { getSession } from "utils/getSession";

const HomeBanner = () => {
  const handleEventClick = () => {
    window.gtag("event", "home_banner_click", {
      event_category: "Home Screen",
      event_label: "Banner Click",
      username: getSession()?.profile?.name,
    });
  };

  return (
    <div
      className="d-flex justify-content-center"
      onClick={() => handleEventClick()}
    >
      <a
        href={process.env.REACT_APP_DISCORD_LINK}
        target="_blank"
        rel="noreferrer"
      >
        <img
          width="100%"
          src={SummerTour}
          alt="Summer Tour JKT48 SHOWROOM Banner"
          style={{ borderRadius: "10px" }}
        />
      </a>
    </div>
  );
};

export default HomeBanner;
