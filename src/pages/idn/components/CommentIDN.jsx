import React, { useEffect, useState, useRef } from "react";
import { Card } from "reactstrap";
import { getSession } from "utils/getSession";

const CommentIDN = ({ chatId, slug, username }) => {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  const generateRandomUsername = () => {
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `user_${randomPart}`;
  };

  const nickname = getSession()?.user?.account_id || generateRandomUsername();

  const setupWebSocket = async () => {
    try {

      const ws = new WebSocket(`wss://chat.idn.app`);
      wsRef.current = ws;

      let registered = false;
      let joined = false;

      ws.onopen = () => {
        console.log("WebSocket connected");
        setConnected(true);
        ws.send(`NICK ${nickname}`);
        ws.send("USER websocket 0 * :WebSocket User");
      };

      ws.onmessage = (event) => {
        const rawMessage = event.data;

        if (rawMessage.startsWith("PING")) {
          ws.send("PONG" + rawMessage.substring(4));
          return;
        }

        if (rawMessage.includes("001") && !registered) {
          registered = true;
          console.log("Connected, joining channel...");
          ws.send(`JOIN #${chatId}`);
          return;
        }

        if (rawMessage.includes("JOIN") && !joined) {
          joined = true;
          console.log("Joined channel, waiting for messages...\n");
          return;
        }

        if (rawMessage.includes("PRIVMSG")) {
          const jsonMatch = rawMessage.match(/PRIVMSG #[^ ]+ :(.*)/);
          if (jsonMatch) {
            try {
              const data = JSON.parse(jsonMatch[1]);

              console.log("jsonData", data);

              if (data?.chat) {
                // Ensure that jsonData is mapped into the desired structure
                const mappedMessage = {
                  user: data?.user,
                  comment: data?.chat?.message,
                  timestamp: data.timestamp || Date.now()
                  // Add more fields if necessary based on your JSON structure
                };
                // Update the messages state with the mapped message
                setMessages((prevMessages) => {
                  if (Array.isArray(prevMessages)) {
                    return [mappedMessage, ...prevMessages];
                  } else {
                    return [mappedMessage];
                  }
                });
              }
            } catch (error) {
              console.error("Failed to parse message:", error);
            }
          }
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setConnected(false);
        wsRef.current = null;
        // setTimeout(() => setupWebSocket(liveUrl), 5000);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Failed to set up WebSocket:", error);
    }
  };

  useEffect(() => {
    if (username && slug) {
      setMessages([])
      setupWebSocket();
    }
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [username]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div>
      <Card
        className="p-0 mb-5"
        style={{
          background: "linear-gradient(to bottom, #A0AEC0 0%, #4A5568 100%)",
          borderRadius: "8px",
          border: "none"
        }}
      >
        {messages?.length > 0 && (
          <div className="p-3 scroll">
            {messages?.slice(0, 60)?.map(
              (item, idx) =>
                item?.comment?.length != "2" &&
                item?.comment?.length != "1" && (
                  <div
                    key={idx}
                    className="px-3 py-2"
                    style={{
                      backgroundColor: "#343a40",
                      borderRadius: "8px",
                      marginBottom: "6px"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: item?.user?.color_code ?? "#24a2b7",
                        fontSize: "18px",
                        fontWeight: "600"
                      }}
                    >
                      {item?.user?.name ?? item?.user?.username}
                    </div>
                    <p className="text-white" style={{ marginTop: "4px" }}>
                      {item.comment}
                    </p>
                  </div>
                )
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CommentIDN;
