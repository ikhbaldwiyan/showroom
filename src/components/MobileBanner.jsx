import { FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UncontrolledAlert } from "reactstrap";
import { activityLog } from "utils/activityLog";

const MobileBanner = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useHistory();

  const trackLinkClicked = () => {
    activityLog({
      userId: user._id ?? "64e2090061ec79ea209a0160",
      logName: "APK Link",
      description: "Download Android Link Click"
    });

    navigate.push("/android");
  };

  return (
    (user?.can_3_room === true || user.totalWatchLive >= 10) && (
      <UncontrolledAlert className="mt-4" color="primary">
        <FaInfoCircle size="20px" className="mb-1 mr-2" />
        Selamat kamu terpilih untuk mencoba beta test Aplikasi JKT48 Showroom
        Mobile
        <a rel="noreferrer" onClick={trackLinkClicked}>
          <b className="mx-1 cursor-pointer">Download Disini</b>
        </a>
      </UncontrolledAlert>
    )
  );
};

export default MobileBanner;
