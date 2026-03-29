import { useActionState, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEditVideo, useVideo } from "../../api/videoApi";
import "./EditForm.scss";

export default function EditForm() {
  const navigate = useNavigate();
  const { videoId } = useParams();

  const { data: video, isLoading } = useVideo(videoId);
  const { mutateAsync: editVideo } = useEditVideo();

  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (video) {
      setIsPublic(video.isPublic || false);
    }
  }, [video]);

  const submitAction = async (_, formData) => {
    let { title, videoUrl, description, imgUrl, isPublic } =
      Object.fromEntries(formData);

    const isPublicValue = isPublic === "on";

    const errors = {};

    if (!title) {
      errors.title = "Title is required!";
    } else if (title.length < 2) {
      errors.title = "Title must be at least 2 characters!";
    }

    if (!videoUrl) {
      errors.videoUrl = "Video URL is required!";
    } else if (videoUrl.length < 10) {
      errors.videoUrl = "Video URL must be at least 10 characters!";
    }

    if (imgUrl && imgUrl.length < 10) {
      errors.imgUrl = "Image URL must be at least 10 characters!";
    }

    if (Object.keys(errors).length > 0) {
      return {
        errors,
        values: {
          title,
          videoUrl,
          description,
          imgUrl,
          isPublic: isPublicValue,
        },
      };
    }

    const videoData = {
      title,
      videoUrl,
      description,
      imgUrl,
      isPublic: isPublicValue,
    };

    try {
      await editVideo({ videoId, videoData });
      toast.success("Video updated successfully!");
      navigate("/my-videos");
      return { errors: {}, values: {} };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Update failed!";
      toast.error(errorMessage);
      return {
        errors: {},
        values: {
          title,
          videoUrl,
          description,
          imgUrl,
          isPublic: isPublicValue,
        },
      };
    }
  };

  const [state, formAction, isPending] = useActionState(submitAction, {
    errors: {},
    values: null,
  });

  useEffect(() => {
    if (state.values && state.values.isPublic !== undefined) {
      setIsPublic(state.values.isPublic);
    }
  }, [state.values]);

  const safeImgUrl =
    video.imgUrl === "/images/video-icon.png" ? "" : video.imgUrl;

  return (
    <form action={formAction}>
      <div className="form-container">
        <h1>Update video</h1>

        <div className="fields">
          <div className="inputCont">
            <label htmlFor="title">
              <b>Title:</b>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={state.values?.title ?? video.title}
            />
            {state.errors?.title && (
              <p className="error">{state.errors.title}</p>
            )}
          </div>

          <div className="inputCont">
            <label htmlFor="videoUrl">
              <b>Video URL:</b>
            </label>
            <input
              type="text"
              name="videoUrl"
              id="videoUrl"
              defaultValue={state.values?.videoUrl ?? video.videoUrl}
            />
            {state.errors?.videoUrl && (
              <p className="error">{state.errors.videoUrl}</p>
            )}
          </div>

          <div className="inputCont">
            <label htmlFor="description">
              <b>Description:</b>
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              defaultValue={state.values?.description ?? video.description}
            ></textarea>
          </div>

          <div className="inputCont">
            <label htmlFor="imgUrl">
              <b>Image URL:</b>
            </label>
            <input
              type="text"
              name="imgUrl"
              id="imgUrl"
              defaultValue={state.values?.imgUrl ?? safeImgUrl}
            />
            {state.errors?.imgUrl && (
              <p className="error">{state.errors.imgUrl}</p>
            )}
          </div>

          <div className="inputCont">
            <label htmlFor="isPublic">
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
        </div>

        <button disabled={isPending || isLoading}>
          {isPending ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}
