import Button from "elements/Button";
import { FaUser } from "react-icons/fa";
import formatNumber from "utils/formatNumber";
import useWindowDimensions from "utils/useWindowDimension";
import PlayerMulti from "./PlayerMulti";

export const RoomPlayer = ({ data, number, layout }) => {
  const { width } = useWindowDimensions();

  const responsive = () => {
    if (width > 1500) {
      if (layout === "threeRoom" || layout === "fourRoom") {
        return "230px";
      }
      return "310px";
    } else {
      if (layout === "threeRoom" || layout === "fourRoom") {
        return "190px";
      }
      return "260px";
    }
  };

  return (
    <div>
      {data?.stream_url ? (
        <>
          <PlayerMulti
            number={number}
            url={data?.stream_url}
            idnUrl={`https://www.idn.app/${data?.username}/live/${data.slug}`}
          />
          <div
            className="d-flex mb-3 align-items-center"
            style={{ marginTop: responsive() }}
          >
            <h5 className="mr-2 mt-1">
              <b>{data?.user?.name.replace("JKT48", "")}</b>
            </h5>

            <Button isPrimary style={{ borderRadius: "6px" }}>
              <FaUser className="mb-1" /> {formatNumber(data?.view_count)}
            </Button>
          </div>
        </>
      ) : (
        <h4>Choose Room {number}</h4>
      )}
    </div>
  );
};

export default RoomPlayer;
