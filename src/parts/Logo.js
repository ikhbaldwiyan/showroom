import React from "react";
import Button from "elements/Button";
import LogoDark from "../../src/assets/images/logo-dark.svg";
import useWindowDimensions from "utils/useWindowDimension";
import { isMobile } from "react-device-detect";

export default function Logo() {
  const { width } = useWindowDimensions();

  return (
    <Button className="brand-text-icon" href="" type="link">
      <div className={`d-flex align-items-center ${!isMobile && "mt-2"}`}>
        <img
          alt="Logo Dark"
          src={LogoDark}
          width="30"
          height="60"
          className="logo-icon mr-2"
        />

        {!isMobile && width > 1200 && (
          <>
            <span className="logo mr-2">JKT48</span>
            <span className="showroom"> SHOWROOM</span>
          </>
        )}

        {width < 768 && (
          <>
            <span className="logo mr-2">JKT48</span>
            <span className="showroom"> SHOWROOM</span>
          </>
        )}
      </div>
    </Button>
  );
}
