
import AdminDashboard from "../pages/admin/Dashboard";
import Client from "../pages/admin/Client";
import AdminSettings from "../pages/admin/Settings"

import ClientDashboard from "../pages/client/Dashboard";
import ClientSettings from "../pages/client/Settings"
// import AdminProfile from "./pages/admin/Profile";
// import ClientProfile from "./pages/client/Profile";
// add other imports here

export const routes = [
  {
    path: "/dashboard",
    allowedRoles: ["admin", "client"],
    roleComponents: {
      admin: AdminDashboard,
      client: ClientDashboard,
    },
  },
  {
    path: "/settings",
    allowedRoles: ["admin", "client"],
    roleComponents: {
      admin: AdminSettings,
      client: ClientSettings,
    },
  },
  {
    path: "/client",
    allowedRoles: ["admin"],
    roleComponents: {
      admin: Client,
    },
  },

  // add more routes similarly
];
