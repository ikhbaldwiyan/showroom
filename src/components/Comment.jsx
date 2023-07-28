/* eslint-disable eqeqeq */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import Skeleton from "react-content-loader";
import Loading from "./Loading";
import {
  SEND_COMMENT,
  PROFILE_API,
  LIVE_INFO,
  LIVE_COMMENT,
  PREMIUM_LIVE_DETAIL,
} from "utils/api/api";
import { toast } from "react-toastify";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import { gaEvent } from "utils/gaEvent";
import formatName from "utils/formatName";
import { getSession } from "utils/getSession";

export default function Comment({ roomId, isMultiRoom, setRoomId, secretKey }) {
  const [comment, setComment] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [session, setSession] = useState("");
  const [textComment, setTextComment] = useState("");
  const [error, setError] = useState("");
  const [myName, setMyName] = useState("");
  const [profile, setProfile] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketUrl, setSocketUrl] = useState("wss://online.showroom-live.com/");
  const [socketKey, setSocketKey] = useState("");
  const cookies = getSession()?.session?.cookie_login_id ?? "comment";

  useEffect(() => {
    async function getComments() {
      try {
        const res = await axios.get(LIVE_COMMENT(roomId, secretKey ?? cookies));
        const comments = res.data;
        setComment(comments);
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
  }, []);

  useEffect(() => {
    const userSession = localStorage.getItem("session");
    const userData = localStorage.getItem("user");
    if (userSession) {
      const foundSession = JSON.parse(userSession);
      const foundUser = JSON.parse(userData);
      setMyName(foundUser.user_id);
      setSession(foundSession);
    }
  }, []);

  useEffect(() => {
    async function getWebsocketInfo() {
      const response = await axios.get(LIVE_INFO(roomId, secretKey ?? cookies));
      setSocketKey(response?.data?.websocket?.key);
    }

    if (roomId === "332503") {
      axios.get(PREMIUM_LIVE_DETAIL("64c129da37f36b98750760a4")).then((res) => {
        setSocketKey(res?.data?.webSocketId);
      });
    } else {
      getWebsocketInfo();
    }

    const newSocket = new WebSocket(socketUrl);
    newSocket.addEventListener("open", () => {
      // console.log('WebSocket connected');
      newSocket.send(`SUB\t${socketKey}`);
    });

    newSocket.addEventListener("message", (event) => {
      const message = event.data;
      const msg = JSON.parse(message.split("\t")[2]);
      const code = parseInt(msg.t, 10);

      if (code === 1) {
        if (!Number.isNaN(msg.cm) && parseInt(msg.cm) <= 50) return;
        const cm = {
          id: String(msg.u) + String(msg.created_at),
          user_id: msg.u,
          name: msg.ac,
          avatar_id: msg.av,
          comment: msg.cm,
          created_at: msg.created_at,
        };
        setComment((prevMessages) => [cm, ...prevMessages]);
      } else if (code === 101) {
        !isMultiRoom ? window.location.reload() : setRoomId(roomId);
      }
    });

    newSocket.addEventListener("close", () => {
      // console.log('WebSocket closed');
    });
    setSocket(newSocket);

    // Cleanup function
    return () => {
      newSocket.close();
    };
  }, [socketKey]);

  useEffect(() => {
    axios
      .post(PROFILE_API, {
        room_id: roomId.toString(),
        cookie: session.cookie_login_id,
      })
      .then((res) => {
        const profile = res.data;
        setProfile(profile);
      });
  }, [roomId]);

  const sendComment = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    try {
      const response = await axios.post(SEND_COMMENT, {
        room_id: roomId.toString(),
        comment: textComment,
        csrf: session.csrf_token,
        cookies_id: session.cookie_login_id,
      });
      console.log(response.data);
      setTextComment("");
      setButtonLoading(false);

      if (isMultiRoom == true) {
        toast.success(
          `Send comment to ${profile?.room_url_key.replace(
            "JKT48_",
            ""
          )} success`,
          {
            theme: "colored",
          }
        );
      }

      if (isMultiRoom) {
        gaEvent(
          "Comment",
          `Send Comment Multi (${formatName(profile.room_url_key)})`,
          textComment
        );
      } else {
        gaEvent(
          "Comment",
          `Send Comment Regular (${formatName(profile.room_url_key)})`,
          textComment
        );
      }
    } catch (err) {
      if (textComment.length > 50) {
        toast.error(`Comment terlalu panjang max 50 karakter gan`, {
          theme: "colored",
        });
      }
      setButtonLoading(false);
      setError("Please try again");
      toast.error(
        "Nomor telepon belum di verifikasi, silahkan verifikasi via aplikasi showroom",
        {
          theme: "colored",
        }
      );
    }
  };

  const LoadingMessage = () => (
    <>
      <h5 style={styles.name}>
        <img
          src="https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87"
          width="30"
          className="mr-2 mb-1"
          alt="avatar"
        />
        Tunggu Wots
        <img
          src="https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87"
          width="30"
          className="ml-2 mb-1"
          alt="avatar"
        />
      </h5>
      <hr />
    </>
  );

  const CommentList = () =>
    Array.from(Array(7), (e, i) => {
      return (
        <div>
          <Skeleton
            viewBox="0 0 300 100"
            height={90}
            width={200}
            backgroundColor="#D1D7E0"
          >
            <rect x="70" y="10" rx="4" ry="4" width="170" height="10" />
            <rect x="70" y="30" rx="3" ry="3" width="200" height="10" />
            <circle cx="25" cy="25" r="25" />
          </Skeleton>
        </div>
      );
    });

  return (
    <Card body inverse color="dark" className="p-0 mb-5">
      <Card body inverse color="dark" className="scroll">
        <div>
          {comment && comment?.length != 0 ? (
            comment?.map(
              (item, idx) =>
                item?.comment?.length != "2" &&
                item?.comment?.length != "1" && (
                  <div key={idx}>
                    <h5
                      style={{
                        color: item?.user_id == myName ? "#DC3545" : "#24a2b7",
                        display: "inline",
                        fontWeight: 500,
                        fontSize: "17px",
                      }}
                    >
                      <img
                        src={`https://static.showroom-live.com/image/avatar/${item.avatar_id}.png?v=95`}
                        width="25"
                        alt={item?.name}
                        className="mr-2 mb-1"
                      />
                      {item?.name} {item?.user_id == myName && "(Me)"}
                    </h5>
                    <p style={styles.comment}>{item?.comment}</p>
                    <hr />
                  </div>
                )
            )
          ) : (
            <div>
              <LoadingMessage />
              <CommentList />
            </div>
          )}
        </div>
      </Card>

      {session && !secretKey ? (
        <>
          {error ? <p className="pl-2 pb-0 text-danger">{error}</p> : ""}

          <form className="d-flex sticky-comment" onSubmit={sendComment}>
            <input
              type="text"
              className="form-control"
              style={{ borderRadius: "0 0 0 .25rem", height: "3rem" }}
              placeholder="Write comment"
              value={textComment}
              onChange={(e) => setTextComment(e.target.value)}
            />
            <button
              type="submit"
              className="btn text-light"
              style={{
                borderRadius: "0 0 .25rem 0",
                height: "3rem",
                backgroundColor: "#24a2b7",
                width: "90px",
              }}
              disabled={buttonLoading ? true : false}
            >
              {buttonLoading ? <Loading color="white" /> : <FiSend size={20} />}
            </button>
          </form>
        </>
      ) : !secretKey ? (
        <>
          <form className="d-flex sticky-comment">
            <input
              type="text"
              className="form-control"
              style={{ borderRadius: "0 0 0 .25rem", height: "3rem" }}
              placeholder="Please Login to comment"
              disabled={true}
            />
            <Link to="/login">
              <button
                type="button"
                className="btn text-light"
                style={{
                  borderRadius: "0 0 .25rem 0",
                  height: "3rem",
                  backgroundColor: "#24a2b7",
                  width: "90px",
                }}
                onClick={() =>
                  gaEvent("Login", "Login To Comment", "Live Stream")
                }
              >
                Login
              </button>
            </Link>
          </form>
        </>
      ) : null}
    </Card>
  );
}

const styles = {
  name: {
    display: "inline",
    color: "#24a2b7",
    fontWeight: 500,
    fontSize: "17px",
  },
  comment: {
    marginTop: 6,
    fontSize: "15px",
  },
};
