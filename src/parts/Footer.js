import React from 'react';
import Button from 'elements/Button';
import Logo from 'parts/Logo';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-auto" style={{width: 380}}>
            <Logo />
            <p className="brand-tagline">
              Solusi bagi Laptop / Hp Kentang yang ingin <br/>
              ngidol dengan website Showroom versi ringan <br />
              dan tampilan User Interface yang berbeda
            </p>
          </div>
          <div className="col-auto mr-2">
            <h6 className="mt-2">Explore</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <Button type="link" href="/live-stream/332503">
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
          <div className="col-6 mr-5">
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
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col text-center copyrights">
            Copyright 2021 • All rights reserved • JKT48SHOWROOM - Inzoid
          </div>
        </div>
      </div>
    </footer>
  )
}
