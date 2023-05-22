import { getSession } from "../getSession";

export const multiRoomUser = () => {
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
      name: "Zoid21",
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
      name: "Lowly",
      accountId: "Lowly"
    },
    {
      name: "Anjay",
      accountId: "Anjay"
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
