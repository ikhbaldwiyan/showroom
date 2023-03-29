import ReactGA from "react-ga";

export const gaEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
