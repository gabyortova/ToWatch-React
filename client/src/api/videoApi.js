import { useEffect, useState } from "react";
import request from "../utils/request";

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
