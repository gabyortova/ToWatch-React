import { useCallback, useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../components/hooks/useAuth";

const baseUrl = "http://localhost:5100/api/videos";

export const useVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    request.get(baseUrl).then(setVideos);
  }, []);

  return { videos };
};

export const useVideo = (videoId) => {
  const [video, setVideo] = useState({});

  useEffect(() => {
    request.get(`${baseUrl}/${videoId}`).then(setVideo);
  }, [videoId]);

  return {
    video,
  };
};

export const useMyVideos = () => {
  const { request } = useAuth();
  const [myVideos, setMyVideos] = useState([]);

  useEffect(() => {
    request.get(`${baseUrl}/my`).then(setMyVideos);
  }, [request]);

  return { myVideos };
};

export const useCrateVideo = () => {
  const { request } = useAuth();

  const create = (videoData) => {
    if (!videoData.imgUrl) {
      videoData.imgUrl = "/images/video-icon.png";
    }

    request.post(baseUrl, videoData);
  };

  return {
    create,
  };
};

export const useEditVideo = () => {
  const { request } = useAuth();

  const edit = (videoId, videoData) => {
    if (!videoData.imgUrl) {
      videoData.imgUrl = "/images/video-icon.png";
    }

    return request.put(`${baseUrl}/${videoId}`, videoData);
  };

  return {
    edit,
  };
};

export const useDeleteVideo = () => {
  const { request } = useAuth();

  const deleteVideo = (videoId) => {
    return request.delete(`${baseUrl}/${videoId}`);
  };

  return { deleteVideo };
};

export const useLikeVideo = () => {
  const { request } = useAuth();

  const likeVideo = (idVideo) => {
    return request.post(`http://localhost:5100/api/likes/like/${idVideo}`);
  };

  return { likeVideo };
};

export const useUnlikeVideo = () => {
  const { request } = useAuth();

  const unlikeVideo = (idVideo) => {
    return request.post(`http://localhost:5100/api/likes/unlike/${idVideo}`);
  };

  return { unlikeVideo };
};

export const useLikeStatus = () => {
  const { request } = useAuth();

  const getLikeStatus = useCallback((idVideo) => {
    return request.get(`http://localhost:5100/api/likes/like-status/${idVideo}`);
  }, [request]);

  return { getLikeStatus };
};

export const useGetLikeCount = () => {
  const { request } = useAuth();

  const getLikeCount = useCallback((idVideo) => {
    return request.get(`http://localhost:5100/api/likes/like-count/${idVideo}`);
  }, [request]);

  return { getLikeCount };
};
