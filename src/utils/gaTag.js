export const gaTag = ({ action, category, label, value, ...props }) => {
  if (window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
      ...props,
    });
  }
};
