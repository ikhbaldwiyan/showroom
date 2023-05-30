import { getSession } from "../getSession";

export const multiRoomUser = () => {
  const id = getSession()?.user?.account_id;

  const registeredUsers = [
    {
      name: "Inzoid",
      id: "inzoid"
    },
    {
      name: "Ikhbal",
      id: "dispatch"
    },
    {
      name: "Zoid21",
      id: "inzoid21"
    },
    {
      name: "Farming Account",
      id: "akunsorum"
    },
    {
      name: "Smooets",
      id: "Smooets"
    },
    {
      name: "Redux",
      id: "redux"
    },
    {
      name: "Dey",
      id: "21032005"
    },
    {
      name: "kurakura",
      id: "mumen013"
    },
  ];

  const isRegisteredUser = registeredUsers.some(user => user?.id === id);

  if (isRegisteredUser) {
    console.log("Access granted");
    return true;
  } else {
    console.log("Access denied");
    return false;
  }
};
