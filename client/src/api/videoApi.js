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
