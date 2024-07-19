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
      action={() => <Button onClick={handleDownload} color="primary">Download APK</Button>}
    >
      <p>
        Halo guys terima kasih atas dukungan dan feedback nya selama Beta
        Testing apk android kemarin, setelah ada beberapa update dan saran dari
        kalian akhirnya aplikasi <b>JKT48 Showroom Fanmade</b> akan segera
        tersedia di Play Store.
        <br />
        <br />
        Jangan lupa untuk daftar pra register <span className="text-primary" onClick={handleDownload}><b>disini</b></span> karena di minggu ini
        kita akan rilis update versi terbaru aplikasinya dan masuk ke tahap{" "}
        <b>Open Testing</b> hanya untuk <b>5000 users</b> yang install pertama.
      </p>
      <img
        width="100%"
        src="https://res.cloudinary.com/dkkagbzl4/image/upload/v1721376669/crsoaopzmdm8jg7fc95c.png"
        alt="JKT48 SHOWROOM APK"
      />
    </CustomModal>
  );
};

export default ModalInfo;
