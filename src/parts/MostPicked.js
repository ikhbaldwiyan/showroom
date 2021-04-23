import React from "react";
import Button from "elements/Button";

export default function MostPicked({data, refMostPicked}) {
  return (
    <section className="container" ref={refMostPicked}>
      <div className="container-grid">
        {data.map((item, idx) => (
          <div key={idx} className="item column-4 row-1">
            <div className="card card-featured">
              <figure className="img-wrapper">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="img-cover"
                />
              </figure>
              <div className="meta-wrapper">
                <Button
                  type="link"
                  className="strecthed-link d-block text-white"
                  href={`properties/${item._id}`}
                >
                  <h5>{item.name}</h5>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
