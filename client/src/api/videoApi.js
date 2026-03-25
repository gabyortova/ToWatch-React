import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../utils/request";
import useAuth from "../components/hooks/useAuth";

const viteApiUrl = import.meta.env.VITE_API_URL;
const baseUrl = `${viteApiUrl}/api/videos`;

const ONE_DAY = 1000 * 60 * 60 * 24;

export const useVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: () => request.get(baseUrl),
    staleTime: ONE_DAY,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useVideo = (videoId) => {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => request.get(`${baseUrl}/${videoId}`),
    enabled: !!videoId,
    staleTime: ONE_DAY,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useMyVideos = () => {
  const { request } = useAuth();

  return useQuery({
    queryKey: ["my-videos"],
    queryFn: () => request.get(`${baseUrl}/my`),
    staleTime: ONE_DAY,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useCreateVideo = () => {
  const queryClient = useQueryClient();
  const { request } = useAuth();

  return useMutation({
    mutationFn: (videoData) => {
      if (!videoData.imgUrl) {
        videoData.imgUrl = "/images/video-icon.png";
      }
      return request.post(baseUrl, videoData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};

export const useEditVideo = () => {
  const queryClient = useQueryClient();
  const { request } = useAuth();

  return useMutation({
    mutationFn: ({ videoId, videoData }) => {
      if (!videoData.imgUrl) {
        videoData.imgUrl = "/images/video-icon.png";
      }
      return request.put(`${baseUrl}/${videoId}`, videoData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      queryClient.invalidateQueries(["video", variables.videoId]);
    },
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  const { request } = useAuth();

  return useMutation({
    mutationFn: (videoId) => request.delete(`${baseUrl}/${videoId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};

export const useLikeVideo = () => {
  const queryClient = useQueryClient();
  const { request } = useAuth();

  return useMutation({
    mutationFn: (idVideo) =>
      request.post(`${viteApiUrl}/api/likes/like/${idVideo}`),

    // optimistic update
    onMutate: async (idVideo) => {
      await queryClient.cancelQueries(["like-count", idVideo]);

      const previousCount = queryClient.getQueryData(["like-count", idVideo]);

      queryClient.setQueryData(["like-count", idVideo], (old) => {
        return old + 1;
      });

      return { previousCount };
    },

    // rollback if error
    onError: (_, idVideo, context) => {
      queryClient.setQueryData(["like-count", idVideo], context.previousCount);
    },

    // sync with backend
    onSettled: (_, __, idVideo) => {
      queryClient.invalidateQueries(["like-count", idVideo]);
      queryClient.invalidateQueries(["like-status", idVideo]);
    },
  });
};

export const useUnlikeVideo = () => {
  const queryClient = useQueryClient();
  const { request } = useAuth();

  return useMutation({
    mutationFn: (idVideo) =>
      request.post(`${viteApiUrl}/api/likes/unlike/${idVideo}`),

    onMutate: async (idVideo) => {
      await queryClient.cancelQueries(["like-count", idVideo]);

      const previousCount = queryClient.getQueryData(["like-count", idVideo]);

      queryClient.setQueryData(["like-count", idVideo], (old) => {
        return old - 1;
      });

      return { previousCount };
    },

    onError: (_, idVideo, context) => {
      queryClient.setQueryData(["like-count", idVideo], context.previousCount);
    },

    onSettled: (_, __, idVideo) => {
      queryClient.invalidateQueries(["like-count", idVideo]);
      queryClient.invalidateQueries(["like-status", idVideo]);
    },
  });
};

export const useLikeStatus = (idVideo) => {
  const { request, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["like-status", idVideo],
    queryFn: () =>
      request.get(`${viteApiUrl}/api/likes/like-status/${idVideo}`),
    enabled: !!idVideo && isAuthenticated,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetLikeCount = (idVideo) => {
  const { request } = useAuth();

  return useQuery({
    queryKey: ["like-count", idVideo],
    queryFn: () => request.get(`${viteApiUrl}/api/likes/like-count/${idVideo}`),
    enabled: !!idVideo,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
