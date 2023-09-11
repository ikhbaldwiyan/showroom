import axios from "axios";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { FaLock, FaUsers, FaUsersCog } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";
import { RiMedalFill } from "react-icons/ri";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import { REDEEM_TASK } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import { getSession } from "utils/getSession";
import { showToast } from "utils/showToast";

const RedeemPoints = ({ userPermisions, handleShowRedeem }) => {
  const InfoAccess = ({ menu }) => {
    return menu ? (
      <AiFillCheckCircle size={32} color="green" />
    ) : (
      <AiFillCloseCircle size={32} color="#dc3545" />
    );
  };

  const features = [
    {
      id: "can_3_room",
      icon: <FaUsers size={20} className="mb-1 mx-1" />,
      name: "3 Room",
      points: 2000,
      unlocked: userPermisions?.can_3_room,
    },
    {
      id: "can_4_room",
      icon: <FaUsersCog size={20} className="mb-1 mx-1" />,
      name: "4 Room",
      points: 2500,
      unlocked: userPermisions?.can_4_room,
    },
    {
      id: "can_farming_page",
      icon: <GiFarmer size={20} className="mb-1" />,
      name: "Farming",
      points: 5000,
      unlocked: userPermisions?.can_farming_page,
    },
    ...(userPermisions?.can_farming_page
      ? [
          {
            id: "can_farming_detail",
            icon: <GiFarmer size={20} className="mb-1" />,
            name: "Detail",
            points: 6000,
            unlocked: userPermisions?.can_farming_detail,
          },
          {
            id: "can_farming_multi",
            icon: <GiFarmer size={20} className="mb-1" />,
            name: "Multi",
            points: 7000,
            unlocked: userPermisions?.can_farming_multi,
          },
        ]
      : []),
  ];

  const UnlockedFeature = ({ feature, permissions }) => (
    <div className="row d-flex justify-content-center align-items-center py-1">
      <div className="col-6">
        <Button size="sm" color="info">
          {getIcon(feature)} {feature}
        </Button>
      </div>
      <div className="col-6">
        <InfoAccess menu={permissions} />
      </div>
    </div>
  );

  const getIcon = (feature) => {
    switch (feature) {
      case "3 Room":
        return <FaUsers size={16} className="mb-1 mx-1" />;
      case "4 Room":
        return <FaUsersCog size={16} className="mb-1 mx-1" />;
      case "Farming":
        return <GiFarmer size={16} className="mb-1" />;
      default:
        return <GiFarmer size={16} className="mb-1" />;
    }
  };

  const hasUnlockedFeatures = features.some((feature) => feature.unlocked);
  const hasUnlockedAllFeatures = features.every((feature) => feature.unlocked);

  const [modal, setModal] = useState(false);
  const [feature, setFeature] = useState("");
  const toggle = () => setModal(!modal);

  const handleUnlockFeature = (featureName) => {
    setFeature(featureName);
    toggle();
  };

  const handleReddemFeature = () => {
    axios
      .post(REDEEM_TASK(feature), {
        user_id: getSession()?.userProfile?.user_id,
      })
      .then((res) => {
        handleShowRedeem();
        showToast("success", res?.data?.message);
        toggle();
      })
      .catch((err) => {
        showToast("error", err?.data?.message);
      });
  };

  return (
    <div className={`py-4 ${isMobile && "mx-2"} `}>
      <div className="row">
        <div className="col-9">
          <h6>
            {hasUnlockedAllFeatures
              ? "All Features Unlocked"
              : "List Locked Feature"}
          </h6>
        </div>
        <div className="col-3">
          <p
            onClick={handleShowRedeem}
            className="text-danger d-flex font-weight-bold cursor-pointer"
          >
            Back
          </p>
        </div>
      </div>
      {!hasUnlockedAllFeatures && (
        <div className="row">
          <div className="col-12">
            <Table className="rounded" dark>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Points</th>
                  <th>Unlock</th>
                </tr>
              </thead>
              <tbody>
                {features
                  .filter((item) => !item.unlocked)
                  .map((feature, index) => (
                    <tr key={index}>
                      <td>
                        {feature.icon}
                        {feature.name}
                      </td>
                      <td className="points">
                        <RiMedalFill className="mb-1" />
                        <b>{formatNumber(feature.points)}</b>
                      </td>
                      <td className="text-center">
                        <Button
                          onClick={() => handleUnlockFeature(feature.id)}
                          color="success"
                        >
                          <FaLock size={16} className="mb-1" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      {hasUnlockedFeatures && (
        <div>
          <hr className="mt-0 mb-4" />
          <h6>Unlocked User Feature</h6>
          <div className="row mt-2">
            <div className="col-12 mb-3">
              {features
                .filter((feature) => feature.unlocked)
                .map((feature, index) => (
                  <UnlockedFeature
                    key={index}
                    feature={feature.name}
                    permissions={feature.unlocked}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader style={{ backgroundColor: "#24a2b7" }} toggle={toggle}>
          Unlock Feature
        </ModalHeader>
        <ModalBody className="text-dark">
          Apakah Anda yakin ingin membuka fitur ini dengan point?
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={handleReddemFeature}>
            Yes
          </Button>
          <Button color="secondary" onClick={toggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RedeemPoints;
