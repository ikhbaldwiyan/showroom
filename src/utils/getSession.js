export const getSession = () => {
  const userSession = localStorage.getItem("session");
  if (userSession) {
    const session = JSON.parse(userSession);
    return session;
  }
};
