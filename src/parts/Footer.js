import React from "react";
import Button from "elements/Button";
import Logo from "parts/Logo";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="container">
          <div className="row">
            <div className="col-md-5" style={{ width: 380 }}>
              <Logo />
              <p className="brand-tagline">
                JKT48 SHOWROOM adalah website fanmade yang bertujuan untuk
                memfilter room member JKT48. disini kalian bisa mencoba ngidol dengan
                pengalaman baru dan User Interface yang berbeda
              </p>
            </div>
            <div className="col-auto mr-2">
              <h6 className="mt-2">Explore</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Button type="link" href="/room/jkt48/332503">
                    Live Stream
                  </Button>
                </li>
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
                  <Button type="link" href="/">
                    Privacy
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button
                    type="link"
                    href="https://discord.gg/gM9UGku4"
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
