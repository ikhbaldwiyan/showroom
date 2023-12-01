import React from "react";
import { RiGlobalLine } from "react-icons/ri";
import Logo from "../../../src/assets/images/logo-dark.svg";

const Header = () => {
  return (
    <div className="header-wrapped">
      <div className="logo-wrapped">
        <img
          alt="Logo"
          src={Logo}
          height="53"
          className="logo-icon mr-2"
        />
        <div className="d-flex flex-column">
          <div className="wrapped-title">
            <span className="text-white">JKT48</span> SHOWROOM WRAPPED
          </div>
          <div className="d-flex align-items-center">
            <div className="web-title mt-1">
              <RiGlobalLine size={20} className="mr-1" />
              www.jkt48showroom.com/wrapped
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
