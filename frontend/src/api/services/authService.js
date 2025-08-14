import API from "../axiosInstance";

const AUTH_URL = {
  register: "/api/auth/register",
  login: "/api/auth/login",
  getuserProfile: "/api/auth/profile",
  logout: "/api/auth/logout",
};

export const LoginFn = async (formData) => {
  const res = await API.post(AUTH_URL.login, formData);
  return res.data;
};

export const registerFn = async (formData) => {
  const res = await API.post(AUTH_URL.register, formData);
  return res.data;
};

export const fetchCurrentUserFn = async () => {
  const res = await API.get(AUTH_URL.getuserProfile);
  return res.data;
};

export const logoutFn = async () => {
  await API.post(AUTH_URL.logout);
};