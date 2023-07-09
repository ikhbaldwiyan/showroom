import React from "react";
import CustomModal from "components/CustomModal";
import { FaDiscord, FaTwitter } from "react-icons/fa";

const ModalInfo = () => {
  return (
    <CustomModal
      buttonText="Open"
      modalTitle="Info Pengumuman"
      autoShowModal={false}
      isShowButton={false}
    >
      <p>
        Halo guys buat yang di kota Bandung dan Solo kita bakalan hadir nih buat
        event Summer Tour, khusus yang dateng kita akan kasih beberapa fitur
        kaya farming sama multi room, jangan sampe kelewatan ya.
        <br />
        <br />
        Info lebih lanjut kalian bisa join discord dan follow twitter JKT48
        SHOWROOM disini ya: <br />
        <p className="mt-2">
          <div className="d-flex align-items-center">
            <FaTwitter className="mr-1" color="#24a2b7" size={20} /> Twitter:{" "}
            <a href="https://twitter.com/Jkt48_Showroom">
              <b className="mx-1">@Jkt48_Showroom</b>
            </a>{" "}
            <br />
          </div>
          <div className="d-flex align-items-center">
            <FaDiscord color="#5869e9" className="mr-1" size={20} />
            Discord:{" "}
            <a href={process.env.REACT_APP_DISCORD_LINK}>
              <b className="ml-1">Discord Group</b>
            </a>
          </div>
        </p>
      </p>
      <img
        width="100%"
        src="https://pbs.twimg.com/media/F0CxGg8acAATvnD?format=jpg&name=medium"
        alt="JKT48 SHOWROOM SUMMER TOUR"
      />
    </CustomModal>
  );
};

export default ModalInfo;
