import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchCurrentUserFn,
  LoginFn,
  registerFn,
} from "../api/services/authService";
import useAuthStore from "../store/authStore";

export const useRegister = () => {
  //   const { login } = useAuthStore();
  return useMutation({
    mutationFn: registerFn,
  });
};

export const useLogin = () => {
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: LoginFn,
    onSuccess: (data) => {
      setUser(data?.user);
    },
  });
};

export const useCurrentUser = (options = {}) => {
  const { setUser, logout } = useAuthStore();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUserFn,
    retry: false,
    enabled: true, // allow manual control if needed
    // onSuccess: (data) => {
    //   if (data?.user) {
    //     setUser(data.user);
    //   } else {
    //     logout();
    //   }
    // },
    onSuccess: (data) => {
      if (data?.user) {
        setUser(data.user); // ✅ This sets Zustand's `user` state
      } else {
        logout(); // clears it
      }
    },

    onError: () => {
      logout();
    },
  });
};
