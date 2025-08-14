// enum: ["admin", "manager", "sales", "client"],

export const menu = {
  admin: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "dashboard", // key from iconMap
    },
    {
      label: "Clients",
      path: "/client",
      icon: "users",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: "settings",
    },
  ],
  client: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "dashboard",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: "settings",
    },
  ],
  // other roles...
};

export const headerDropdown = {
  admin: [
    {
      label: "Profile",
      icon: "user",
      path: "",
    },
    // {
    //   label: "Logout",
    //   action: "logout",
    //   icon: MdOutlineLogout,
    // },
  ],

  client: [
    {
      label: "Profile",
      icon: "user",
      path: "",
    },
    // {
    //   label: "Logout",
    //   action: "logout",
    //   icon: MdOutlineLogout,
    // },
  ],
};
