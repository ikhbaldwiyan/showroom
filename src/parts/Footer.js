import React from "react";
import Button from "elements/Button";
import Logo from "parts/Logo";

export default function Footer({ theme }) {
  return (
    <footer>
      <div className="container">
        <div className="container">
          <div className="row">
            <div className="col-md-5" style={{ width: 380 }}>
              <Logo theme={theme} />
              <p className="brand-tagline">
                JKT48 SHOWROOM hadir untuk memberikan pengalaman ngidol yang
                lebih seru dan interaktif, dan dengan fitur multiroom, kamu bisa
                menikmati pengalaman menonton yang lebih menyenangkan dan
                berbeda dari yang lainnya.
              </p>
            </div>
            <div className="col-auto mr-2">
              <h6 className="mt-2">Explore</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Button type="link" href="/list-room">
                    Room List
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button type="link" href="/multi-room">
                    Multi Room
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button type="link" href="/login">
                    Login
                  </Button>
                </li>
              </ul>
            </div>
            <div className="col-auto mr-5">
              <h6 className="mt-2">More Info</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Button type="link" href="/about">
                    About
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button type="link" href="/login">
                    Register
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button
                    type="link"
                    href={process.env.REACT_APP_DISCORD_LINK}
                    isExternal
                    target="_blank"
                  >
                    Discord Group
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col text-center copyrights">
              Copyright 2022 • All rights reserved • JKT48SHOWROOM - Inzoid
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
