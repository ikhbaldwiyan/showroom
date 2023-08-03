import Search from "components/Search";
import React from "react";
import { useState } from "react";
import { AiFillGift } from "react-icons/ai";
import { GiPodiumWinner } from "react-icons/gi";
import { Button, Table } from "reactstrap";
import formatViews from "utils/formatViews";

const RightMenu = ({ gift, setSearch, filterName }) => {
  const [menu, setMenu] = useState("podium");

  return (
    <>
      <Button
        className="menu"
        style={menu === "podium" ? buttonActive : buttonStyle}
        onClick={() => setMenu("podium")}
      >
        <GiPodiumWinner className="mb-1" /> Podium
      </Button>
      <Button
        className="menu"
        style={menu === "gift" ? buttonActive : buttonStyle}
        onClick={() => setMenu("gift")}
      >
        <AiFillGift className="mb-1" /> Gift
      </Button>

      {menu === "podium" ? (
        <>
          <Table dark>
            <Search setSearch={setSearch} placeholder="Search podium name" />
            <div className="scroll-room">
              <thead
                style={{
                  backgroundColor: "#24a2b7",
                  color: "white",
                  borderTop: "none",
                }}
              >
                <tr>
                  <th>Rank</th>
                  <th>Ava</th>
                  <th>Username</th>
                  <th>Points</th>
                </tr>
              </thead>
              {filterName &&
                filterName.map((item, idx) => (
                  <tbody key={idx}>
                    <tr>
                      <th className="text-center">{idx + 1}</th>
                      <td>
                        <img
                          width="40"
                          alt="avatar"
                          src={`https://static.showroom-live.com/image/avatar/${item.avatar_id}.png`}
                        />
                      </td>
                      <td style={{ wordBreak: "break-word" }}>{item.name}</td>
                      <td>{formatViews(item.fans_point)}</td>
                    </tr>
                  </tbody>
                ))}
            </div>
          </Table>
        </>
      ) : (
        <Table dark>
          <div className="scroll-room">
            <thead
              style={{
                backgroundColor: "#24a2b7",
                color: "white",
                borderTop: "none",
              }}
            >
              <tr>
                <th>Img</th>
                <th>Name</th>
                <th>Num</th>
                <th>User</th>
              </tr>
            </thead>
            {gift &&
              gift.map((item, idx) => (
                <tbody key={idx}>
                  <tr>
                    <td>
                      <img width="40" alt="gift" src={item.img} />
                    </td>
                    <td style={{ wordBreak: "break-word" }}>{item.name}</td>
                    <td style={{ wordBreak: "break-word" }}>{item.num}x</td>
                    <td style={{ wordBreak: "break-word" }}>
                      <div className="d-flex align-items-center">
                        {item.user_count}
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
          </div>
        </Table>
      )}
    </>
  );
};

export default RightMenu;

const buttonStyle = {
  backgroundColor: "teal",
  border: "none",
};

const buttonActive = {
  backgroundColor: "#008b9b",
  border: "none",
};
