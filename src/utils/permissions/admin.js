import { getSession } from "../getSession";

export const isAdmin = () => {
  const accountId = getSession()?.user?.account_id;

  const adminAccount = [
    {
      name: "Inzoid",
      accountId: "inzoid"
    },
    {
      name: "Dey",
      accountId: "21032005"
    },
    {
      name: "kurakura",
      accountId: "mumen013"
    },
    {
      name: "Ikhbal",
      accountId: "dispatch"
    },
    {
      name: "Rendi",
      accountId: "rendii10"
    },
  ];

  const admin = adminAccount.some(user => user?.accountId === accountId);

  if (admin) {
    return true;
  } else {
    return false;
  }
};
