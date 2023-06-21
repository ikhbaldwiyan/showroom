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
    {
      name: "ekx.prm",
      id: "2501006"
    },
    {
      name: "RZ",
      id: "88589867"
    },
    {
      name: "Budi",
      id: "BudiSetiawam"
    },
    {
      name: "HAFIT CAHYA",
      id: "111220069086"
    },
    {
      name: "sofyanegi",
      id: "semiclone0"
    },
    {
      name: "RamdaniDebruyne",
      id: "ramdanitralala"
    },
    {
      name: "Ikhwan RM",
      id: "Karawang123"
    },
    {
      name: "zeel",
      id: "zeell8"
    },
    {
      name: "Opalfadilah",
      id: "opalfadilah"
    },
    {
      name: "kafka",
      id: "kapka"
    },
    {
      name: "Fadhil",
      id: "zharrxx"
    },
    {
      name: "Khatsuu",
      id: "khatsu123"
    },
    {
      name: "ZAKII",
      id: "ASTROPHILE"
    },
    {
      name: "DixaVi",
      id: "48fleyprb11"
    },
    {
      name: "Syawal",
      id: "syawal"
    },
    {
      name: "Rifqi",
      id: "abqiaf"
    },
    {
      name: "Buzzardbro",
      accountId: "VcrBuzzard"
    },
  ];

  const isRegisteredUser = registeredUsers.some((user) => user?.id === id);

  if (isRegisteredUser) {
    return true;
  } else {
    return false;
  }
};
