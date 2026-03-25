import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../utils/request";
import { UserContext } from "../components/contexts/UserContex";
import useAuth from "../components/hooks/useAuth";

const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { userLoginHandler } = useContext(UserContext);

  return useMutation({
    mutationFn: ({ email, password }) =>
      request.post(`${baseUrl}/login`, { email, password }),

    onSuccess: (data) => {
      userLoginHandler(data);
      queryClient.clear();
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ username, email, pass, rePass }) =>
      request.post(`${baseUrl}/register`, {
        username,
        email,
        pass,
        rePass,
      }),
  });
};

export const useLogout = () => {
  const { request: authRequest } = useAuth();
  const { accessToken, userLogoutHandler } = useContext(UserContext);
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      if (accessToken) {
        const options = {
          headers: {
            "x-authorization": accessToken,
          },
        };

        await authRequest.post(`${baseUrl}/logout`, null, options);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      userLogoutHandler();
      queryClient.clear();
    }
  };

  return {
    logout,
    isAuthenticated: !!accessToken,
  };
};
