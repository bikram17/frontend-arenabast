import RootLayout from "./layouts/RootLayout";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admins from "./pages/Admins";
import Transfer from "./pages/Transfer";
import TransferRequset from "./pages/TransferRequset";
import History from "./pages/History";
import Agents from "./pages/Agents";
import Players from "./pages/Players";




const routes = [
  {
    path: "/",
    element: Login,
    layout: (props) => (
      <RootLayout {...props} showSidebar={false} showNavbar={false} />
    ),
    protected: false,
  },

  {
    path: "/dashboard",
    element: Dashboard,
    layout: RootLayout,
    protected: true,
  },

  {
    path: "/admins",
    element: Admins,
    layout: RootLayout,
    protected: true,
  },

  {
    path: "/agents",
    element: Agents,
    layout: RootLayout,
    protected: true,
  },
  {
    path: "/players",
    element: Players,
    layout: RootLayout,
    protected: true,
  },

  {
    path: "/add",
    element: CreateUser,
    layout: RootLayout,
    protected: true,
  },


  {
    path: "/profile",
    element: Profile,
    layout: RootLayout,
    protected: true,
  },

  {
    path: "/transfer",
    element: Transfer,
    layout: RootLayout,
    protected: true,
  },

  {
    path: "/transfer",
    element: Transfer,
    layout: RootLayout,
    protected: true,
  },

  {
    path: "/history",
    element: History,
    layout: RootLayout,
    protected: true,
  },

  {
    path: "/transfer-request",
    element: TransferRequset,
    layout: RootLayout,
    protected: true,
  },
];

export default routes;
