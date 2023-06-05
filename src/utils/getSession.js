export const getSession = () => {
  const session = localStorage.getItem("session");
  const user = localStorage.getItem("user");
  const profile = localStorage.getItem("profile");
  const sessionData = JSON.parse(session);
  const userData = JSON.parse(user);
  const profileData = JSON.parse(profile);

  return { session: sessionData, user: userData, profile: profileData };
};
