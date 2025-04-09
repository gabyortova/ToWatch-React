import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../components/hooks/useAuth";
import { UserContext } from "../components/contexts/UserContex";

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
      videoData.imgUrl = '/images/video-icon.png';
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
