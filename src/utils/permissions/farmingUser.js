import { getSession } from "../getSession";

export const farmingUser = () => {
  const accountId = getSession().user.account_id;

  const registeredUsers = [
    {
      name: "Inzoid",
      accountId: "inzoid"
    },
    {
      name: "Ikhbal",
      accountId: "dispatch"
    },
    {
      name: "Lowly",
      accountId: "inzoid21"
    },
    {
      name: "Farming Account",
      accountId: "akunsorum"
    },
    {
      name: "Smooets",
      accountId: "Smooets"
    },
    {
      name: "Redux",
      accountId: "redux"
    },
  ];

  const isRegisteredUser = registeredUsers.some(user => user.accountId === accountId);

  if (isRegisteredUser) {
    console.log("Access granted");
    return true;
  } else {
    console.log("Access denied");
    return false;
  }
};
