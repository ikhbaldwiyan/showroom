import ReactGA from "react-ga";

export const gaEvent = (category, action, label) => {
  if (window.location.hostname !== "localhost") {
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  }
};
