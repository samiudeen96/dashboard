// import { useCurrentUser } from "../hooks/authHook";
// import useAuthStore from "../store/authStore";
// import { Navigate, useLocation } from "react-router-dom";


// const RoleBasedRoute = ({ allowedRoles, roleComponents }) => {
//   const { data, isLoading, isFetching, error } = useCurrentUser();
//   const user = data?.user;

//   if (isLoading || isFetching) {
//     // Show loading spinner or null while fetching user data
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(user?.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   const Component = roleComponents[user?.role];
//   if (!Component) return <div>No page found for your role.</div>;

//   return <Component />;
// };

// export default RoleBasedRoute;

// import useAuthStore from "../store/authStore";
// import { Navigate } from "react-router-dom";

// const RoleBasedRoute = ({ allowedRoles, roleComponents }) => {
//   const { user } = useAuthStore();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   const Component = roleComponents[user.role];
//   return Component ? <Component /> : <div>No page found for your role.</div>;
// };

// export default RoleBasedRoute;


// components/RoleBasedProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import useAuthStore from "../store/authStore";

// const RolebasedRoute = ({ allowedRoles, roleComponents, guestOnly = false }) => {
//   const { user, isAuthLoading } = useAuthStore();

//   // Wait for auth check
//   if (isAuthLoading) {
//     return <div>Loading...</div>;
//   }

//   // Guest-only pages (like /login, /register)
//   if (guestOnly) {
//     if (user) {
//       return <Navigate to="/dashboard" replace />;
//     }
//     return roleComponents?.guest || <div>No guest page found.</div>;
//   }

//   // Protected pages
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Role-based restriction
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   const Component = roleComponents?.[user.role];
//   return Component ? <Component /> : <div>No page found for your role.</div>;
// };

// export default RolebasedRoute;




import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

const RolebasedRoute = ({ allowedRoles, roleComponents, guestOnly = false }) => {
  const { user, isAuthLoading } = useAuthStore();
  const location = useLocation();

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  // Guest-only pages (like /login, /register)
  if (guestOnly) {
    if (user) {
      // Redirect back to where they came from, or default to dashboard
      return <Navigate to={location.state?.from || "/dashboard"} replace />;
    }
    return roleComponents?.guest || <div>No guest page found.</div>;
  }

  // Protected pages
  if (!user) {
    // Save the attempted path in state
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Role-based restriction
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  const Component = roleComponents?.[user.role];
  return Component ? <Component /> : <div>No page found for your role.</div>;
};

export default RolebasedRoute;
