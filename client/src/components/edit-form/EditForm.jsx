import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEditVideo, useVideo } from "../../api/videoApi";
import "./EditForm.css";

export default function EditForm() {
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();
  const { edit } = useEditVideo();

  let videoId = useParams();
  videoId = videoId.videoId;
  
  const { video } = useVideo(videoId);

  useEffect(() => {
    if (video) {
      setIsPublic(video.isPublic || false);
    }
  }, [video]);

  if (video.imgUrl == "/images/video-icon.png") {
    video.imgUrl = "";
  }

  const submitAction = (formData) => {
    let { title, videoUrl, description, imgUrl, isPublic } =
      Object.fromEntries(formData);

    if (isPublic == "on") {
      isPublic = true;
    } else {
      isPublic = false;
    }

    const videoData = { title, videoUrl, description, imgUrl, isPublic };

    edit(videoId, videoData);

    navigate("/my-videos");
  };

  return (
    <>
      <form action={submitAction}>
        <div className="form-container">
          <h1>Update video</h1>
          <div className="fields">
            <label htmlFor="title">
              <b>Title:</b>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              minLength="2"
              defaultValue={video.title}
            />

            <label>
              <b>Video URL:</b>
            </label>
            <input
              type="text"
              name="videoUrl"
              id="videoUrl"
              required
              minLength="10"
              defaultValue={video.videoUrl}
            />

            <label>
              <b>Description:</b>
            </label>
            <textarea
              name="description"
              id="description"
              required
              minLength="5"
              rows="3"
              defaultValue={video.description}
            ></textarea>

            <label>
              <b>Image URL:</b>
            </label>
            <input
              type="text"
              name="imgUrl"
              id="imgUrl"
              minLength="10"
              defaultValue={video.imgUrl}
            />

            <label>
              <b>Is public:</b>
            </label>
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          </div>
          <button>Update</button>
        </div>
      </form>
    </>
  );
}
