import { useEffect, useContext, useState } from "react";
import request from "../utils/request";
import { UserContext } from "../components/contexts/UserContex";

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
  const { accessToken, userLogoutHandler } = useContext(UserContext);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const options = {
      headers: {
        "X-Authorization": accessToken,
      },
    };

    request.get(`${baseUrl}/logout`, null, options).finally(userLogoutHandler);
  }, [accessToken, userLogoutHandler]);

  return {
    isLoggedOut: !!accessToken,
  };
};

export const useProfile = () => {
  const { accessToken } = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    
    const options = {
      headers: {
        "x-authorization": accessToken,
      },
    };
    request.get(`${baseUrl}/users/profile`, null, options).then(setUser);
  }, [accessToken]);

  return {
    user,
  };
};
