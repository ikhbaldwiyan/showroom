import React from "react";
import { FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const NoTicket = ({
  isCustomLive,
  setIsCustomLive,
  customUrl,
  setCustomUrl,
}) => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>JKT48 Official SHOWROOM</h2>
        {isCustomLive && (
          <Button
            className="mb-2 mr-1"
            onClick={() => setCustomUrl(!customUrl)}
            color="danger"
          >
            <FaKey className="mb-1" />
          </Button>
        )}
      </div>
      <img
        width="100%"
        className="rounded mt-3"
        alt="JKT48 Official"
        src="https://static.showroom-live.com/image/room/cover/73f495d564945090f4af7338a42ce09ffa12d35fbfa8ce35c856220bcf96c5f3_l.png?v=1683304746"
      />
      <h3
        className="py-3 text-danger"
        onClick={() => setIsCustomLive(!isCustomLive)}
      >
        Maaf anda belum punya tiket untuk show ini
      </h3>
      <p>
        Silahkan cek <Link to="/theater-schedule">jadwal theater</Link> untuk
        beli tiket
      </p>
    </div>
  );
};

export default NoTicket;
