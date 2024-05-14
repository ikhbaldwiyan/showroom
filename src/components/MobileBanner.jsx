import { FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { UncontrolledAlert } from "reactstrap";
import { activityLog } from "utils/activityLog";

const MobileBanner = () => {
  const user = useSelector((state) => state.user.user);

  const trackLinkClicked = () => {
    activityLog({
      userId: user._id ?? "64e2090061ec79ea209a0160",
      logName: "APK Link",
      description: "Download Android Link Click"
    });
  };

  return (
    ((user?.can_3_room === true) || (user.totalWatchLive >= 50)) && (
      <UncontrolledAlert className="mt-4" color="primary">
        <FaInfoCircle size="20px" className="mb-1 mr-2" />
        Selamat kamu terpilih untuk mencoba beta test Aplikasi JKT48 Showroom Mobile
        <a
          href={process.env.REACT_APP_ANDROID_LINK}
          target="_blank"
          rel="noreferrer"
          onClick={trackLinkClicked}
        >
          <b className="mx-1">Download Disini</b>
        </a>
      </UncontrolledAlert>
    )
  );
};

export default MobileBanner;
