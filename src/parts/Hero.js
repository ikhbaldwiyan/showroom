import React from 'react';

import imgHero from 'assets/images/img-hero.jpg';
import imgHeroFrame from 'assets/images/img-hero-frame.jpg';
import iconCities from 'assets/images/icons/icon_cities.svg';
import iconTraveler from 'assets/images/icons/icon_traveler.svg';
import iconTreasure from 'assets/images/icons/icon_treasure.svg';

import Button from 'elements/Button';
import FormatNumber from 'utils/formatNumber'; 

export default function Hero({data, refMostPicked}) {
  function showMostPicked() {
    window.scrollTo({
      top: refMostPicked.current.offsetTop - 30,
      behavior: "smooth",
    });
  }

  return (
    <section className="container pt-4">
      <div className="row aligns-item-center">
        <div className="col-auto pr-5" style={{ width: 530 }}>
          <h1 className="font-weight-bold line-height-1 mb-3">
            Forget Busy Work,<br />
            Start Next Vacation
          </h1>
          <h5
            className="mb-4 font-weight-light text-gray-500 w-75"
            style={{ lineHeight: "170%" }}
          >
            We provide what you need to enjoy your holiday with family. Time to
            make another memorable moments.
          </h5>
          <Button className="btn px-5" hasShadow isPrimary onClick={showMostPicked}>
            Show Me
          </Button>

          <div className="row" style={{marginTop: 80}}>
            <div className="col-auto mr-4">
              <img src={iconTraveler} alt="Travelers" width={36} height={36} />
              <h6 className="mt-3">
                {FormatNumber(data.travelers)}{" "}
                <span className="text-gray-500 font-weight-light">
                  Travelers
                </span>
              </h6>
            </div>
            <div className="col-auto mr-4">
              <img src={iconTreasure} alt="Treasure" width={36} height={36} />
              <h6 className="mt-3">
                {FormatNumber(data.treasures)}{" "}
                <span className="text-gray-500 font-weight-light">
                  Treasures
                </span>
              </h6>
            </div>
            <div className="col-auto mr-4">
              <img src={iconCities} alt="Cities" width={36} height={36} />
              <h6 className="mt-3">
                {FormatNumber(data.cities)}{" "}
                <span className="text-gray-500 font-weight-light">Cities</span>
              </h6>
            </div>
          </div>
        </div>
        
        <div className="col-6 pl-5 mt-4">
          <div style={{ width: 540, height: 410 }}>
            <img
              src={imgHero}
              alt="Hero"
              className="img-fluid position-absolute"
              style={{ margin: "-30px 0 0 -30px", zIndex: 1 }}
            />
            <img
              src={imgHeroFrame}
              alt="Hero"
              className="img-fluid position-absolute"
              style={{ margin: "0 -15px -15px 0" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
