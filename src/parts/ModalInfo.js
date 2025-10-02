import CustomModal from "components/CustomModal";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import { activityLog } from "utils/activityLog";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";

const ModalInfo = () => {
  const user = useSelector((state) => state.user.user);

  const handleDonate = () => {
    window.open("https://saweria.co/JKT48Showroom48/wishlist/perpanjang-web-domain-com-02nyxc", "_blank");
    gaTag({
      action: "donate_link",
      category: "Donate",
      label: "Website",
      username: getSession()?.profile?.name ?? "Guest"
    });
  };

  return (
    <CustomModal
      isInfo
      buttonText="Open"
      modalTitle="Pengumuman Website"
      autoShowModal={true}
      isShowButton={false}
      action={() => (
        <Button onClick={handleDonate} color="primary">
          Donasi
        </Button>
      )}
    >
      <p>
        Halo guys terima kasih sudah jadi pengunjung setia website JKT48 Showroom Fanmade,
        Karena domain <b>.com</b> di website ini sudah hampir expired maka dari itu kami meminta bantuan dari kalian dengan open donasi patungan via saweria agar website dengan nama <span className="text-primary "> <b>jkt48showroom.com</b></span> masih bisa terus digunakan setahun kedepan.
        <br />
        <br />
        Kalian bisa ikut patungan lewat link saweria
        <a href="https://saweria.co/JKT48Showroom48/wishlist/perpanjang-web-domain-com-02nyxc" target="_blank" onClick={() => {
          activityLog({
            userId: user._id ?? "64e2090061ec79ea209a0160",
            logName: "Donate",
            description: "Donate patungan domain web"
          });
        }}> Disini</a>, Mohon dukungannya agar web ini masih bisa hidup terima kasih 🙏🏻
      </p>
      <center>
        <img
          width="200"
          src="https://res.cloudinary.com/dkkagbzl4/image/upload/v1759416666/members/qffso5hjbeog7evhwcy8.png"
          alt="JKT48 SHOWROOM APK"
        />
      </center>
    </CustomModal>
  );
};

export default ModalInfo;
