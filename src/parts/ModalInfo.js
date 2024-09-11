import React, { useEffect, useState } from "react";
import CustomModal from "components/CustomModal";
import { Button } from "reactstrap";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";

const ModalInfo = () => {
  const handleDownload = () => {
    window.open(process.env.REACT_APP_ANDROID_LINK, "_blank");
    gaTag({
      action: "playstore_link",
      category: "Play Store",
      label: "Android",
      username: getSession()?.profile?.name ?? "Guest"
    });
    localStorage.setItem("releaseInfo", "true");
  };

  return (
    <CustomModal
      isInfo
      buttonText="Open"
      modalTitle="Pengumuman Aplikasi"
      autoShowModal={localStorage.getItem("releaseInfo") ? false : true}
      isShowButton={false}
      action={() => (
        <Button onClick={handleDownload} color="primary">
          Download APK
        </Button>
      )}
    >
      <p>
        Halo guys terima kasih atas dukungan dan feedback nya selama Beta
        Testing apk android kemarin, setelah ada banyak update dan kritik saran
        dari kalian akhirnya aplikasi <b>JKT48 Showroom Fanmade</b> sudah
        official launching dan sudah tersedia di Play Store.
        <br />
        <br />
        Download sekarang update versi terbaru aplikasinya{" "}
        <span className="text-primary" onClick={handleDownload}>
          <b className="cursor-pointer"> disini</b>
        </span>{" "}
        Jangan lupa kasih review rating dan komen nya juga ya guys biar kita
        makin semangat developnya hehe, Terima kasih.
      </p>
      <img
        width="100%"
        src="https://res.cloudinary.com/dkkagbzl4/image/upload/v1725986998/tkaow9tf4v27d4dig07g.png"
        alt="JKT48 SHOWROOM APK"
      />
    </CustomModal>
  );
};

export default ModalInfo;
