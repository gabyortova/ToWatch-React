import { useState } from "react";
import useAuth from "../components/hooks/useAuth";

const baseUrl = "http://localhost:5100/api";

export const useProfile = () => {
  const { request } = useAuth();
  const [user, setUser] = useState({});

  const getUser = () => {
    request.get(`${baseUrl}/users/profile`).then(setUser);
  };

  if (!user) {
    getUser();
  }

  return { user, getUser };
};

export const useEditProfile = () => {
  const { request } = useAuth();

  const editProfile = async (username, email) =>
    request.put(`${baseUrl}/users/profile`, { username, email });

  return { editProfile };
};
