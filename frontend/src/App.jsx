// import { Routes, Route, Navigate } from "react-router-dom";
// import Auth from './components/AuthTab';
// import { Toaster } from "react-hot-toast";
// import Unauthorized from './pages/auth/Unauthorized';
// import Layout from "./Layout";
// import useAuthStore from "./store/authStore";
// import { routes } from "./routes/routeConfig";
// import RolebasedRoute from "./routes/RoleBasedRoute";
// import { useCurrentUser } from "./hooks/authHook";
// import { useEffect } from "react";

// const App = () => {


//   return (
//     <>
//       <Toaster position="top-center" reverseOrder={false} />
//       <Routes>
//         <Route path='/' element={<Root />} />
//         <Route path='/login' element={<Auth />} />
//         <Route path='/unauthorized' element={<Unauthorized />} />

//         <Route element={<Layout />}>
//           {routes.map(({ path, allowedRoles, roleComponents }) => (
//             <Route
//               key={path}
//               path={path}
//               element={
//                 <RolebasedRoute
//                   allowedRoles={allowedRoles}
//                   roleComponents={roleComponents}
//                 />
//               }
//             />
//           ))}
//         </Route>
//       </Routes>
//     </>
//   );
// };

// export default App;


// const Root = () => {
//   const { data, isLoading, isFetching } = useCurrentUser();
//   const user = data?.user;

//   if (isLoading || isFetching) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   const targetRoute = routes.find((r) => r.allowedRoles.includes(user.role));

//   if (!targetRoute) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Navigate to={targetRoute.path} replace />;
// };

// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from './components/AuthTab';
import { Toaster } from "react-hot-toast";
import Unauthorized from './pages/auth/Unauthorized';
import Layout from "./Layout";
import useAuthStore from "./store/authStore";
import { routes } from "./routes/routeConfig";
import RolebasedRoute from "./routes/RoleBasedRoute";
import useUiStore from "./store/uiStore";
import Sidebar from "./components/common/Sidebar";
import ActionModal from "./components/ActionModal"

const App = () => {
  // const openModal = useUiStore((state) => state.openModal);

  const { openModal, isSidebarOpen, openSidebar } = useUiStore();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Root />} />
        {/* <Route path='/login' element={<Auth />} /> */}
        <Route
          path="/login"
          element={
            <RolebasedRoute
              guestOnly
              roleComponents={{
                guest: <Auth />
              }}
            />
          }
        />
        <Route path='/unauthorized' element={<Unauthorized />} />

        <Route element={<Layout />}>
          {routes.map(({ path, allowedRoles, roleComponents }) => (
            <Route
              key={path}
              path={path}
              element={
                <RolebasedRoute
                  allowedRoles={allowedRoles}
                  roleComponents={roleComponents}
                />
              }
            />
          ))}
        </Route>
      </Routes>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed sm:hidden inset-0 z-50 transition-opacity duration-300 ${isSidebarOpen ? "bg-black/40" : "pointer-events-none opacity-0"
          }`}
        onClick={() => openSidebar(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-64 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside sidebar
        >
          <Sidebar />
        </div>
      </div>

      {openModal && <ActionModal />}
    </>
  );
};

export default App;

const Root = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const targetRoute = routes.find((r) => r.allowedRoles.includes(user.role));

  if (!targetRoute) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Navigate to={targetRoute.path} replace />;
};


