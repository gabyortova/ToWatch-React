import { useState } from "react";
import useAuth from "../components/hooks/useAuth";

const baseUrl = "http://localhost:5100/api";

export const useProfile = () => {
  const { request } = useAuth();
  const [user, setUser] = useState({});

  const getUser = () => {
    request.get(`${baseUrl}/users/profile`).then(setUser);
  };

  getUser();

  return { user, getUser };
};

export const useEditProfile = () => {
  const { request } = useAuth();
  const { getUser } = useProfile();

  const editProfile = (username, email) => {
    const data = { username, email };
    request.put(`${baseUrl}/users/profile`, data).then(getUser);
  };

  return { editProfile };
};
