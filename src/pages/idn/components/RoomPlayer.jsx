import Button from "elements/Button";
import { FaUser } from "react-icons/fa";
import PlayerMulti from "./PlayerMulti";

export const RoomPlayer = ({ data, number, layout }) => (
  <div>
    {data?.stream_url ? (
      <>
        <PlayerMulti
          url={data?.stream_url}
          idnUrl={`https://www.idn.app/${data?.username}/live/${data.slug}`}
        />
        <div className="d-flex" style={{ marginTop: "260px" }}>
          <h4 className="mr-2">
            <b>{data?.user?.name}</b>
          </h4>
          {(layout === "twoRoom" || layout === "threeRoom") && (
            <Button isPrimary style={{ borderRadius: "6px" }}>
              <FaUser className="mb-1" /> {data?.view_count}
            </Button>
          )}
        </div>
      </>
    ) : (
      <h4>Choose Room {number}</h4>
    )}
  </div>
);

export default RoomPlayer;
