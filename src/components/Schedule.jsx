import axios from "axios";
import Button from "elements/Button";
import SkeletonList from "parts/skeleton/SkeletonList";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Fade } from "react-reveal";
import { THEATER_SCHEDULE_API } from "utils/api/api";
import getTimes from "utils/getTimes";

const Schedule = ({ theme }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    try {
      axios.get(THEATER_SCHEDULE_API).then((res) => {
        setSchedule(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getImageUrl = (title) => {
    if (title.includes("Cara Meminum Ramune")) {
      return "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2020/11/16/9189132f-a408-412d-a11d-f1cb41505c10-1605500712740-a8b264aa7dff3d998ae581d3fbbaf233.jpg";
    } else if (title.includes("Ingin Bertemu")) {
      return "https://pbs.twimg.com/media/FvYFXbjaAAITstl?format=jpg&name=4096x4096";
    } else if (title.includes("Aturan Anti Cinta")) {
      return "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2021/04/05/c7976999-b028-405f-948b-9777afc8a629-1617593375345-ca8626d0ba97c53fe6777313e9bab23f.jpg";
    } else if (title.includes("Tunas Dibalik Seragam")) {
      return "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2021/10/20/4199945391.jpg";
    } else if (title.includes("Pajama Drive")) {
      return "http://stage48.net/wiki/images/a/ad/Academy1stPromoPoster.jpg";
    } else {
      return "https://static.showroom-live.com/image/room/cover/73f495d564945090f4af7338a42ce09ffa12d35fbfa8ce35c856220bcf96c5f3_m.png?v=1683304746";
    }
  };

  return (
    <>
      <h3 className="py-4 theater-title">Jadwal Theater Premium Live</h3>
      <div className="container-grid">
        {schedule.length ? (
          schedule.map((item, idx) => (
            <div
              key={idx}
              className={`item ${isMobile ? "column-12" : `column-4`} row-1`}
            >
              <Fade bottom>
                <div className="card card-featured">
                  <Button
                    href={item.entrance_url}
                    type="link"
                    isExternal
                    target="_blank"
                  >
                    <div className="tag" style={{ backgroundColor: "teal" }}>
                      {getTimes(item.start_at)}
                    </div>
                    <figure className="img-wrapper">
                      <img
                        src={getImageUrl(item.title)}
                        alt={item.name}
                        className="img-cover"
                      />
                    </figure>
                    <div className="meta-wrapper">
                      <Button
                        type="link"
                        style={{ textDecoration: "none" }}
                        className="strecthed-link d-block text-white"
                        href={item.entrance_url}
                        isExternal
                        target="_blank"
                      >
                        <h5>{item.title.replace("2023", "")}</h5>
                      </Button>
                    </div>
                  </Button>
                </div>
              </Fade>
            </div>
          ))
        ) : (
          <SkeletonList theme={theme} />
        )}
      </div>
    </>
  );
};

export default Schedule;
