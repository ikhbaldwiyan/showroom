export const getSession = () => {
  const session = localStorage.getItem("session");
  const user = localStorage.getItem("user");
  const profile = localStorage.getItem("profile");
  const userProfile = localStorage.getItem("userProfile");
  const sessionData = JSON.parse(session);
  const userData = JSON.parse(user);
  const profileData = JSON.parse(profile);
  const userProfileData = JSON.parse(userProfile);

  return {
    session: sessionData,
    user: userData,
    profile: profileData,
    userProfile: userProfileData,
  };
};
