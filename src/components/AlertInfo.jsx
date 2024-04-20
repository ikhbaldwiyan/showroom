import { useSelector } from "react-redux";
import { activityLog } from "utils/activityLog";
import { gaEvent } from "utils/gaEvent";
import { getSession } from "utils/getSession";

const AlertInfo = ({ page, label }) => {
  const user = useSelector((state) => state.user.user);

  const trackLinkClicked = () => {
    gaEvent(page, "Discord Link Click", label);
    activityLog({
      userId: user._id ?? "64e2090061ec79ea209a0160",
      logName: "Discord Link",
      description: "Discord Link Click"
    });
  };

  return (
    (user?.can_3_room === false || getSession()?.session === null) && (
      <a
        href={process.env.REACT_APP_DISCORD_LINK}
        target="_blank"
        rel="noreferrer"
        onClick={trackLinkClicked}
      >
        <img
          width="100%"
          className="rounded"
          src="https://discordapp.com/api/guilds/1076511743909564506/widget.png?style=banner2"
          alt="discord banner"
        />
      </a>
    )
  );
};

export default AlertInfo;
