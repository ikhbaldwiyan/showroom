import axios from "axios";
import MainLayout from "pages/layout/MainLayout";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { FaDonate } from "react-icons/fa";
import { Button, Col, Row } from "reactstrap";
import { activityLog } from "utils/activityLog";
import { LIST_DONATOR } from "utils/api/api";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";

const SupportProject = () => {
  const [donators, setDonators] = useState([]);

  useEffect(() => {
    try {
      axios.get(LIST_DONATOR).then((res) => {
        setDonators(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDonateClick = () => {
    window.open("https://saweria.co/Inzoid");
    activityLog({
      logName: "Donate",
      description: "Donate saweria button click",
      userId: getSession()?.userProfile?._id ?? "64e2090061ec79ea209a0160",
    });

    gaTag({
      action: "donate_button_click",
      category: "Donation",
      label: "Saweria",
    })
  };

  return (
    <MainLayout title="Support Project">
      <div className="layout">
        <Row>
          <Col md="6">
            <h3>Support Our Project</h3>
            <p className="mt-3">
              Halo guys terima kasih sudah support project ini sampai sekarang,
              Jika kalian ingin mendukung perkembangan project JKT48 SHOWROOM
              untuk biaya server, domain dan service lainnya. kita juga akan
              kasih early acces untuk fitur baru dan nonton max multi room buat para donator, Yuk support
              kita dengan cara donasi bisa klik tombol dibawah ini.
            </p>
            <Button
              className="mb-3"
              onClick={handleDonateClick}
              style={{ backgroundColor: "#E49C20", border: "none" }}
            >
              <div className="d-flex align-items-center py-1">
                <FaDonate size={26} className="mr-2" />
                <span style={{ fontSize: 18, fontWeight: 600 }}>
                  Donate via saweria
                </span>
              </div>
            </Button>
          </Col>
          <Col md="6">
            <h3 className="mb-3">Thanks For Donation</h3>
            <img
              className="rounded-large"
              width="100%"
              src="https://media.discordapp.net/attachments/1108380195175551047/1212798033566367744/image.png?ex=65f3252f&is=65e0b02f&hm=9caf567c67354376ce93dde10e37594d8d8ee43301e7c91c2bfba46effdcf21a&=&format=webp&quality=lossless&width=1440&height=353"
              alt="donate"
            />
          </Col>
          <Col>
            <hr style={{ borderColor: "white" }} />
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <h3>Donator Discord</h3>
            <p className="mt-3">
              Jika kamu sudah donate akan mendapatkan role <b>Donator</b> di
              server discord dan foto profile dengan username kalian akan di
              tampilkan di halaman thanks page ini.
            </p>
          </Col>
          <Col md="12">
            <div className="list-donator mb-3">
              {isMobile ? (
                <div className="list-donator">
                  <div className="donator-wrap">
                    {donators?.map((item, idx) => (
                      <div key={idx} className="user-donate">
                        <img
                          width={40}
                          className="rounded"
                          src={`https://cdn.discordapp.com/avatars/${item.user.id}/${item.user.avatar}.png`}
                          alt={item.user.username}
                        />
                        <div className="donator-name">
                          <span className="donator-text">
                            {item.user.global_name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                Array.from(
                  { length: Math.ceil(Math.min(donators.length, 20) / 3) },
                  (_, rowIndex) => (
                    <div key={rowIndex} className="row">
                      {donators
                        .slice(rowIndex * 4, rowIndex * 4 + 4)
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className={`col-3 ${rowIndex !== 0 ? "mt-3" : ""}`}
                          >
                            <div className="user-donate">
                              <img
                                width={40}
                                className="rounded"
                                src={`https://cdn.discordapp.com/avatars/${item.user.id}/${item.user.avatar}.png`}
                                alt={item.user.username}
                              />
                              <div className="donator-name">
                                <span className="donator-text">
                                  {item.user.global_name}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )
                )
              )}
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default SupportProject;
