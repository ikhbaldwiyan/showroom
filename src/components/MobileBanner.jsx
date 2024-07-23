import { FaInfoCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UncontrolledAlert } from "reactstrap";

const MobileBanner = () => {
  return (
    <UncontrolledAlert className="mt-4" color="primary">
      <FaInfoCircle size="20px" className="mr-2" />
      Aplikasi JKT48 Showroom Fanmade sudah tersedia di Play Store
      <a
        rel="noreferrer"
        href={process.env.REACT_APP_ANDROID_LINK}
        target="_blank"
      >
        <b className="mx-1 cursor-pointer">Download Disini</b>
      </a>
    </UncontrolledAlert>
  );
};

export default MobileBanner;
