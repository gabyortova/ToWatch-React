import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../components/hooks/useAuth";

const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

export const useProfile = () => {
  const { request } = useAuth();

  return useQuery({
    queryKey: ["profile"],
    queryFn: () => request.get(`${baseUrl}/users/profile`),
    staleTime: 5 * 60 * 1000,
  });
};

export const useEditProfile = () => {
  const { request } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, email }) =>
      request.put(`${baseUrl}/users/profile`, { username, email }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
