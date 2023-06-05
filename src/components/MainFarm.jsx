import React from "react";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import Loading from "./Loading";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { IoReload } from "react-icons/io5";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import "react-circular-progressbar/dist/styles.css";

const MainFarm = ({
  limitUntil,
  starsRedux,
  currentRoomId,
  countSuccess,
  officialRoom,
  btnLoadingRoom,
  isFarming,
  until,
  time,
  allMessage,
  isLoadingStars,
  showModal,
  modalLog,
  farmingTime,
  header,
  getOfficials,
  handleStop,
  handleCheckStar,
  buttonInfo,
  startFarming,
  setShowModal,
  toggle,
  textColor,
  setFarmingTime,
}) => {

  const FarmingTime = () => {
    useEffect(() => {
      if (allMessage && allMessage.length > 0) {
        const startTime = allMessage[0].timestamp;
        const endTime = allMessage[allMessage.length - 1].timestamp;
        const start = new Date(`2023-01-01T${startTime}:00`).getTime();
        const end = new Date(`2023-01-01T${endTime}:00`).getTime();
        const diffMs = end - start;
        const diffMin = Math.floor(diffMs / 60000);
        setFarmingTime(diffMin);
      }
    }, [allMessage]);

    const { minutes } = useTimer({
      expiryTimestamp: Date.now() + farmingTime * 60000,
      onExpire: () => setFarmingTime(0),
    });

    return (
      <p className="text-primary text-warning">
        Farming Time: {minutes} Minutes
      </p>
    );
  };

  return (
    <div className="scroll rounded" style={{ backgroundColor: "#343a40" }}>
      {limitUntil ? (
        <>
          <div className="row mt-4 justify-content-center text-danger text-center">
            <h5>{limitUntil}</h5>
          </div>
          <hr style={{ borderColor: "silver" }} />
        </>
      ) : (
        <Container>
          {officialRoom.length > 0 ? (
            <div className="row d-flex justify-content-between align-items-center mx-1 mt-2">
              <Button
                style={{
                  backgroundColor: "teal",
                }}
                onClick={getOfficials}
                className="btn text-light"
                disabled={
                  btnLoadingRoom ? true : false || limitUntil ? true : false
                }
              >
                {btnLoadingRoom ? (
                  <Loading color="white" size={8} />
                ) : (
                  <span className="d-flex align-items-center">
                    <IoReload className="mx-1" />
                  </span>
                )}
              </Button>
              <Button
                onClick={isFarming ? handleStop : handleCheckStar}
                className="btn text-light"
                disabled={
                  btnLoadingRoom ? true : false || isLoadingStars ? true : false
                }
                style={{
                  backgroundColor: isFarming ? "#dc3545" : "#24a2b7",
                }}
              >
                {buttonInfo()}
              </Button>
            </div>
          ) : (
            ""
          )}
        </Container>
      )}

      {officialRoom.length > 0 ? (
        <>
          <div className="row mt-3 mb-2">
            <div className="d-flex col-sm-12 justify-content-end flex-column">
              <div className="row mb-2 justify-content-center">
                {starsRedux.map(({ gift_id, count, url }, index) => (
                  <div
                    key={index}
                    className={`star${
                      index === 0 ? "A" : "B"
                    } d-flex flex-column align-items-center p-1`}
                  >
                    <img
                      src={
                        gift_id
                          ? `https://static.showroom-live.com/image/gift/${gift_id}_s.png?v=1`
                          : url
                      }
                      width="50px"
                      height="50px"
                      alt=""
                    />
                    {isLoadingStars ? (
                      <Loading color="white" size={6} />
                    ) : (
                      <b>{count ?? <Loading color="white" size={6} />}</b>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-sm-12 mt-2 d-flex align-items-center justify-content-center">
              {isFarming && !until ? (
                <div
                  style={{ width: 120, height: 120 }}
                  className="mb-3 mx-auto"
                >
                  <CircularProgressbar
                    value={(time / 50) * 100 > 100 ? "100" : (time / 50) * 100}
                    text={
                      <tspan dy={3} dx={0}>
                        {time === 50
                          ? "100%"
                          : ((time / 50) * 100).toFixed(2) > 100
                          ? "100%"
                          : ((time / 50) * 100).toFixed().replace(/.00$/, "") +
                            "%"}
                      </tspan>
                    }
                    strokeWidth={15}
                    styles={buildStyles({
                      strokeLinecap: "butt",
                      textSize: "17px",
                      textColor: `white`,
                      pathTransitionDuration: 0.5,
                      pathColor: "#08BC0C",
                      trailColor: "#d6d6d6",
                    })}
                  />
                </div>
              ) : (
                <div
                  style={{ width: 120, height: 120 }}
                  className="mb-3 mx-auto"
                >
                  <CircularProgressbar
                    value={limitUntil ? 100 : 0}
                    text={
                      <tspan dy={3} dx={0}>
                        {limitUntil ? "100%" : "0%"}
                      </tspan>
                    }
                    strokeWidth={15}
                    styles={buildStyles({
                      strokeLinecap: "butt",
                      textSize: "17px",
                      textColor: `white`,
                      pathTransitionDuration: 0.5,
                      pathColor: `#dc3545`,
                      trailColor: "#d6d6d6",
                    })}
                  />
                </div>
              )}
            </div>
            <div className="col-sm-12 text-center d-flex align-items-center justify-content-center">
              {isFarming && !until ? (
                <div className="mb-0 mx-2">
                  <p style={{ fontWeight: "bold", textAlign: "center" }}>
                    Current room :
                    <p style={{ color: "#24a2b7" }}>[{currentRoomId}]</p>
                    <Button color="success mb-3" onClick={toggle}>
                      Total Farming Succes {countSuccess}
                    </Button>
                  </p>
                </div>
              ) : (
                <div className="col-12">
                  <Button color="success mb-3" onClick={toggle}>
                    Total Farming Succes {countSuccess}
                  </Button>
                  {until && <FarmingTime />}
                </div>
              )}
            </div>
          </div>

          <div className="row mx-1">
            <div className="col-12">
              <div>
                <Table bordered>
                  <thead style={{ backgroundColor: "#24a2b7", color: "white" }}>
                    <tr>
                      <th>Farming Log Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMessage && allMessage.length > 0 ? (
                      <>
                        {allMessage
                          ?.map(({ message }, idx) => (
                            <tr key={idx}>
                              <td className={textColor(message)}>{message}</td>
                            </tr>
                          ))
                          ?.reverse()}
                      </>
                    ) : (
                      ""
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center mt-5 mb-5">
          <Button
            style={{
              backgroundColor: "#24a2b7",
            }}
            onClick={getOfficials}
            className="btn text-light"
            disabled={
              btnLoadingRoom ? true : false || limitUntil ? true : false
            }
          >
            {btnLoadingRoom ? (
              <Loading color="white" size={8} />
            ) : (
              "Click This Button To Activate Farm"
            )}
          </Button>
        </div>
      )}

      <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
        <ModalHeader style={header} toggle={() => setShowModal(false)}>
          Message
        </ModalHeader>
        <ModalBody>
          <span className="text-dark">
            Semua stars sudah full apakah tetap running auto farming?
          </span>
        </ModalBody>
        <ModalFooter>
          <Button
            color="info"
            onClick={() => {
              startFarming();
              setShowModal(false);
            }}
          >
            Run
          </Button>
          <Button color="danger" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalLog} toggle={toggle}>
        <ModalHeader style={header} toggle={toggle}>
          {isFarming ? "Farming Succes History" : "Farming Ended"}
        </ModalHeader>
        <ModalBody style={{ backgroundColor: "#21252b" }} className="text-dark">
          <h4 className="py-2 text-light text-center">
            <b className="text-success">{countSuccess} ROOM</b>
          </h4>
          <div className="text-center">
            <FarmingTime />
          </div>
          <Table bordered>
            <thead style={{ color: "white" }}>
              <tr>
                <th>Success Log History</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {allMessage && allMessage.length > 0 ? (
                <>
                  {allMessage
                    ?.map(
                      ({ message, timestamp }, idx) =>
                        message?.includes("Sukses") && (
                          <tr key={idx}>
                            <td className="text-light">{message}</td>
                            <td
                              className="text-light"
                              style={{
                                fontSize: 14,
                                textAlign: "center",
                              }}
                            >
                              {timestamp}
                            </td>
                          </tr>
                        )
                    )
                    ?.reverse()}
                </>
              ) : (
                ""
              )}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter style={{ backgroundColor: "#21252b" }}>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MainFarm;
