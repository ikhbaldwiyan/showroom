import { getSession } from "../getSession";

export const farmingUser = () => {
  const accountId = getSession()?.user?.account_id;

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
    {
      name: "Lowly",
      accountId: "Lowly"
    },
    {
      name: "Anjay",
      accountId: "Anjay"
    },
    {
      name: "Farming Account",
      accountId: "farming221"
    },
    {
      name: "Dey",
      accountId: "21032005"
    },
    {
      name: "kurakura",
      accountId: "mumen013"
    },
  ];

  const isRegisteredUser = registeredUsers.some(user => user?.accountId === accountId);

  if (isRegisteredUser) {
    console.log("Access granted");
    return true;
  } else {
    console.log("Access denied");
    return false;
  }
};
