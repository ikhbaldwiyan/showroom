export default function formatName(name, hideGroup = true) {
  let memberName;
  if (name === "JKT48_OlineM") {
    return "Oline";
  }
  !hideGroup
    ? (memberName = name ? name?.replace("JKT48_", "") + " JKT48" : "Loading")
    : (memberName = name?.includes("JKT48_")
        ? name?.replace("JKT48_", "")
        : name?.replace("JKT48", ""));
  return memberName;
}