import React from 'react';
import Button from 'elements/Button';
import BrandIcon from 'parts/IconText';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-auto" style={{width: 380}}>
            <BrandIcon />
            <p className="brand-tagline">
              Solusi bagi Laptop / Hp Kentang yang ingin <br/>
              ngidol dengan aplikasi Showroom versi ringan
            </p>
          </div>
          <div className="col-auto mr-2">
            <h6 className="mt-2">Explore</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <Button type="link" href="/live-stream/undefined">
                  Live Stream
                </Button>
              </li>
              <li className="list-group-item">
                <Button type="link" href="/list-room">
                  Room List
                </Button>
              </li>
            </ul>
          </div>
          <div className="col-6 mr-5">
            <h6 className="mt-2">More Info</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <Button type="link" href="/register">
                  About
                </Button>
              </li>
              <li className="list-group-item">
                <Button type="link" href="/privacy">
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
