import React, { useEffect } from "react";
import { useCurrentUser } from "../hooks/authHook";
import useAuthStore from "../store/authStore";

const AuthProvider = ({ children }) => {
  const { isFetching, isLoading, data } = useCurrentUser();
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  }, [data?.user, setUser]);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthProvider;

