import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaArrowUp, FaCommentDots, FaGift, FaSearch } from "react-icons/fa";
import { IoChatbubbleEllipses, IoCloseCircle } from "react-icons/io5";
import { Card } from "reactstrap";
import "./ReplayChat.css";
import { isDesktop } from "react-device-detect";

const SRT_BASE_URL = "https://jkt48.gemes.in/replay/data/srt/";

/**
 * Parse SRT content into chat messages array
 * Format: index \n timestamp --> timestamp \n username: message
 */
function parseSRT(srtText) {
  const entries = [];
  const blocks = srtText.trim().split(/\n\s*\n/);

  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 3) continue;

    const timeLine = lines[1];
    const textLine = lines.slice(2).join(" ");

    // Parse timestamps: 00:00:13,746 --> 00:00:14,145
    const timeMatch = timeLine.match(
      /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/
    );
    if (!timeMatch) continue;

    const startSeconds =
      parseInt(timeMatch[1]) * 3600 +
      parseInt(timeMatch[2]) * 60 +
      parseInt(timeMatch[3]) +
      parseInt(timeMatch[4]) / 1000;

    // Parse username and message
    const isGift = textLine.startsWith("[GIFT] ");
    const cleanText = isGift ? textLine.replace("[GIFT] ", "") : textLine;
    const colonIndex = cleanText.indexOf(": ");

    let username, message;
    if (colonIndex !== -1) {
      username = cleanText.substring(0, colonIndex).trim();
      message = cleanText.substring(colonIndex + 2).trim();
    } else {
      username = "Unknown";
      message = cleanText;
    }

    entries.push({
      id: parseInt(lines[0]),
      startTime: startSeconds,
      username,
      message,
      isGift,
    });
  }

  return entries;
}

/**
 * Format seconds into HH:MM:SS or MM:SS
 */
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Generate consistent color from username string
 */
function getUsernameColor(username) {
  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
    "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#82E0AA",
    "#F1948A", "#85C1E9", "#F0B27A", "#A3E4D7", "#D2B4DE",
    "#AED6F1", "#A9DFBF", "#FAD7A0", "#A9CCE3", "#D5DBDB",
  ];
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

const ReplayChat = ({ srtFile, currentTime, isPlaying, isTheaterMode }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const chatContainerRef = useRef(null);
  const lastAutoScrollTime = useRef(0);

  // Fetch and parse SRT file
  useEffect(() => {
    async function fetchSRT() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${SRT_BASE_URL}${srtFile}`, {
          responseType: "text",
        });
        const messages = parseSRT(response.data);
        setAllMessages(messages);
      } catch (err) {
        console.error("Failed to fetch SRT:", err);
        setError("Chat replay tidak tersedia untuk video ini");
      } finally {
        setLoading(false);
      }
    }
    if (srtFile) {
      fetchSRT();
    }
  }, [srtFile]);

  // Get visible messages based on current video time
  const visibleMessages = useMemo(() => {
    const seen = new Set();

    const uniqueMessages = allMessages.filter((msg) => {
      const key = `${msg.username.toLowerCase()}-${msg.message.toLowerCase()}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });

    let msgs = uniqueMessages.filter(
      (msg) => msg.startTime <= currentTime
    );

    if (search) {
      const searchLower = search.toLowerCase();

      msgs = msgs.filter(
        (msg) =>
          msg.username.toLowerCase().includes(searchLower) ||
          msg.message.toLowerCase().includes(searchLower)
      );
    }

    return msgs.reverse();
  }, [allMessages, currentTime, search]);

  // Auto-scroll to top when new messages appear
  useEffect(() => {
    if (!autoScroll || !chatContainerRef.current) return;

    const now = Date.now();
    if (now - lastAutoScrollTime.current < 200) return;
    lastAutoScrollTime.current = now;

    const container = chatContainerRef.current;
    requestAnimationFrame(() => {
      container.scrollTop = 0;
    });
  }, [visibleMessages.length, autoScroll]);

  // Detect manual scroll to disable auto-scroll
  const handleScroll = useCallback(() => {
    if (!chatContainerRef.current) return;
    const container = chatContainerRef.current;
    const isAtTop = container.scrollTop < 60;
    setAutoScroll(isAtTop);
  }, []);

  const scrollToTop = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
      setAutoScroll(true);
    }
  };

  const [showSearch, setShowSearch] = useState(false);

  return (
    <Card className="replay-chat-card">
      {/* Header */}
      <div className="replay-chat-header">
        <div className="replay-chat-header-left">
          <IoChatbubbleEllipses size={20} />
          <span className="replay-chat-title">CHAT LIST</span>
        </div>
        {isDesktop && (
          <div className="replay-chat-search-wrapper">
            <input
              type="text"
              className="replay-chat-search"
              placeholder="Cari username atau chat.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
        {showSearch && !isDesktop ? (
          <div className="replay-chat-search-wrapper">
            <div className="replay-chat-search-container">
              <input
                type="text"
                className="replay-chat-search"
                placeholder="Cari username atau chat.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <IoCloseCircle
                onClick={() => {
                  setShowSearch(false)
                  setSearch("")
                }}
                className="search-close"
              />
            </div>
          </div>
        ) : !isDesktop ? (
          <FaSearch onClick={() => setShowSearch(!showSearch)} />
        ) : ""}

      </div>

      {/* Messages */}
      {loading ? (
        <div className="replay-chat-loading">
          <div className="replay-chat-spinner" />
          <p>Memuat chat replay...</p>
        </div>
      ) : error ? (
        <div className="replay-chat-error">
          <FaCommentDots size={32} />
          <p>{error}</p>
        </div>
      ) : (
        <div
          className="replay-chat-messages"
          ref={chatContainerRef}
          onScroll={handleScroll}
          style={{
            height: isTheaterMode ? "400px" : "calc(100vh - 240px)",
          }}
        >
          {visibleMessages.length === 0 ? (
            <div className="replay-chat-empty">
              <p>
                {currentTime === 0
                  ? "Play video untuk melihat chat replay"
                  : "Chat tidak ditemukan"}
              </p>
            </div>
          ) : (
            visibleMessages.map((msg) => (
              <div
                key={msg.id}
                className={`replay-chat-message ${msg.isGift ? "gift" : ""}`}
              >
                <div className="replay-chat-message-content">
                  <span
                    className="replay-chat-username"
                    style={{ color: getUsernameColor(msg.username) }}
                  >
                    {msg.isGift && <FaGift className="replay-chat-gift-icon" />}
                    {msg.username}
                  </span>
                  <span className="replay-chat-text">{msg.message}</span>
                </div>
                <span className="replay-chat-timestamp">
                  {formatTime(msg.startTime)}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Scroll to top button */}
      {!autoScroll && visibleMessages.length > 0 && (
        <button className="replay-chat-scroll-btn" onClick={scrollToTop}>
          <FaArrowUp size={14} className="mb-1 mr-1" /> Chat terbaru
        </button>
      )}
    </Card>
  );
};

export default ReplayChat;
