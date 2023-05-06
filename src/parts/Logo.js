import React from "react";
import Button from "elements/Button";
import LogoDark from "../../src/assets/images/logo-dark.svg";
import LogoLight from "../../src/assets/images/logo-light.svg";

export default function Logo({ theme }) {
  return (
    <Button className="brand-text-icon" href="" type="link">
      <div className="d-flex align-items-center">
        {theme === "dark" ? (
          <img alt="Logo Dark" src={LogoDark} width="30" className="mr-3" />
        ) : (
          <img alt="Logo Light" src={LogoLight} width="30" className="mr-3" />
        )}
        <span className="logo mr-2">JKT48</span>
        <span className="showroom"> SHOWROOM</span>
      </div>
    </Button>
  );
}
