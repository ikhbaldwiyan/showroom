import { FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UncontrolledAlert } from "reactstrap";

const MobileBanner = () => {
  const navigate = useHistory();

  const trackLinkClicked = () => {
    navigate.push("/android");
  };

  return (
    <UncontrolledAlert className="mt-4" color="primary">
      <FaInfoCircle size="20px" className="mb-1 mr-2" />
      Aplikasi JKT48 Showroom Beta telah tersedia
      <a rel="noreferrer" onClick={trackLinkClicked}>
        <b className="mx-1 cursor-pointer">Download Disini</b>
      </a>
    </UncontrolledAlert>
  );
};

export default MobileBanner;
