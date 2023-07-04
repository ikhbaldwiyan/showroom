import React from "react";
import CustomModal from "components/CustomModal";

const ModalInfo = () => {
  return (
    <CustomModal
      buttonText="Open"
      modalTitle="Info Pengumuman"
      autoShowModal={true}
      isShowButton={false}
    >
      <p>
        Halo guys buat yang di kota Bandung dan Solo kita bakalan hadir nih buat
        event Summer Tour, khusus yang dateng kita akan kasih beberapa fitur
        kaya farming sama multi room, jangan sampe kelewatan ya.
        <br />
        <br />
        Info lebih lanjut kalian bisa join discord dan follow twitter JKT48
        SHOWROOM disini ya: <br /> <br /> 
        <p>
          Twitter:{" "}
          <a href="https://twitter.com/Jkt48_Showroom">
            <b>https://twitter.com/Jkt48_Showroom</b>
          </a> <br />
          Discord:{" "}
          <a href={process.env.REACT_APP_DISCORD_LINK}>
            <b>Discord Group</b>
          </a>
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
