import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEditVideo, useVideo } from "../../api/videoApi";
import "./EditForm.scss";

export default function EditForm() {
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();

  const { videoId } = useParams();

  const { data: video } = useVideo(videoId);
  const { mutate: editVideo } = useEditVideo();

  useEffect(() => {
    if (video) {
      setIsPublic(video.isPublic || false);
    }
  }, [video]);

  const submitAction = (formData) => {
    let { title, videoUrl, description, imgUrl, isPublic } =
      Object.fromEntries(formData);

    isPublic = isPublic === "on";

    const videoData = { title, videoUrl, description, imgUrl, isPublic };

    editVideo(
      { videoId, videoData },
      {
        onSuccess: () => {
          toast.success("Video updated successfully!", {
            duration: 3000,
          });
          navigate("/my-videos");
        },
      },
    );
  };

  const safeImgUrl =
    video.imgUrl === "/images/video-icon.png" ? "" : video.imgUrl;

  return (
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
            defaultValue={safeImgUrl}
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
  );
}
