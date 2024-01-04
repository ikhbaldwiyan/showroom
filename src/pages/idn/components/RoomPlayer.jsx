import Button from "elements/Button";
import { FaUser } from "react-icons/fa";
import PlayerMulti from "./PlayerMulti";

export const RoomPlayer = ({ data, number }) => (
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
          <Button isPrimary style={{ borderRadius: "6px" }}>
            <FaUser className="mb-1" /> {data?.view_count}
          </Button>
        </div>
      </>
    ) : (
      <h3>Choose Room {number}</h3>
    )}
  </div>
);
