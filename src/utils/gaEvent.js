import ReactGA from "react-ga";

export const gaEvent = (category, action, label) => {
  if (
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "192.168.100.42"
  ) {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  }
};
