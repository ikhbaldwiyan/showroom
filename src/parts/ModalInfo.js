import React from "react";
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
  };

  return (
    <CustomModal
      buttonText="Open"
      modalTitle="Info Pengumuman"
      autoShowModal={true}
      isShowButton={false}
      action={() => (
        <Button onClick={handleDownload} color="primary">
          Download APK
        </Button>
      )}
    >
      <p>
        Halo guys terima kasih atas dukungan dan feedback nya selama Beta
        Testing apk android kemarin, setelah ada beberapa update dan kritik saran dari
        kalian akhirnya aplikasi <b>JKT48 Showroom Fanmade</b> sudah
        tersedia di Play Store.
        <br />
        <br />
        Download sekarang update versi terbaru aplikasinya{" "}
        <span className="text-primary" onClick={handleDownload}>
          <b className="cursor-pointer"> disini</b>
        </span>{" "}
        hanya tersedia untuk <b>5000 users</b> yang install pertama di tahap <b>Open Testing</b> kali ini.
        Jangan lupa kasih rating dan komen nya juga ya guys, Terima kasih.
      </p>
      <img
        width="100%"
        src="https://res.cloudinary.com/dkkagbzl4/image/upload/v1721552905/poxe8omxe3rzla8tkeds.png"
        alt="JKT48 SHOWROOM APK"
      />
    </CustomModal>
  );
};

export default ModalInfo;
