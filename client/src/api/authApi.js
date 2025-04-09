import { useEffect, useContext, useState } from "react";
import request from "../utils/request";
import { UserContext } from "../components/contexts/UserContex";
import useAuth from "../components/hooks/useAuth";

const baseUrl = "http://localhost:5100/api";

export const useLogin = () => {
  const login = async (email, password) =>
    request.post(`${baseUrl}/login`, { email, password });

  return {
    login,
  };
};

export const useRegister = () => {
  const register = (username, email, pass, rePass) =>
    request.post(`${baseUrl}/register`, { username, email, pass, rePass });

  return {
    register,
  };
};

export const useLogout = () => {
  const { request } = useAuth();
  const { accessToken, userLogoutHandler } = useContext(UserContext);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const options = {
      headers: {
        "x-authorization": accessToken,
      },
    };

    request.get(`${baseUrl}/logout`, null, options).finally(userLogoutHandler);
  }, [accessToken, userLogoutHandler, request]);

  return {
    isLoggedOut: !!accessToken,
  };
};

export const useProfile = () => {
  const { request } = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    request.get(`${baseUrl}/users/profile`).then(setUser);
  }, [request]);

  console.log(user);
  
  return {
    user,
  };
};
