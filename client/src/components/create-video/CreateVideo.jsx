import { useActionState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useCreateVideo } from "../../api/videoApi";

export default function CreateVideo() {
  const navigate = useNavigate();
  const { mutateAsync: createVideo } = useCreateVideo();

  const submitAction = async (_, formData) => {
    let { title, videoUrl, description, imgUrl, isPublic } =
      Object.fromEntries(formData);

    isPublic = isPublic === "on";

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
        values: { title, videoUrl, description, imgUrl, isPublic },
      };
    }

    const videoData = { title, videoUrl, description, imgUrl, isPublic };

    try {
      await createVideo(videoData);

      toast.success("Video created successfully!", {
        duration: 3000,
      });

      navigate("/my-videos");
      return { errors: {}, values: {} };
    } catch (err) {
      console.error("Create video error:", err);

      const errorMessage =
        err.response?.data?.message || err.message || "Failed to create video!";
      toast.error(errorMessage);

      return {
        errors: {},
        values: { title, videoUrl, description, imgUrl, isPublic },
      };
    }
  };

  const [state, formAction, isPending] = useActionState(submitAction, {
    errors: {},
    values: {
      title: "",
      videoUrl: "",
      description: "",
      imgUrl: "",
      isPublic: false,
    },
  });

  return (
    <>
      <form action={formAction}>
        <div className="form-container">
          <h1>Create video</h1>
          <div className="fields">
            <div className="inputCont">
              <label htmlFor="title">
                <b>Title:</b>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={state.values?.title}
              />
              <div>
                {state.errors?.title && (
                  <p className="error">{state.errors.title}</p>
                )}
              </div>
            </div>

            <div className="inputCont">
              <label htmlFor="videoUrl">
                <b>Video URL:</b>
              </label>
              <input
                type="text"
                name="videoUrl"
                id="videoUrl"
                defaultValue={state.values?.videoUrl}
              />
              <div>
                {state.errors?.videoUrl && (
                  <p className="error">{state.errors.videoUrl}</p>
                )}
              </div>
            </div>

            <div className="inputCont">
              <label htmlFor="description">
                <b>Description:</b>
              </label>
              <textarea
                name="description"
                id="description"
                rows="3"
                defaultValue={state.values?.description}
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
                defaultValue={state.values?.imgUrl}
              />
              <div>
                {state.errors?.imgUrl && (
                  <p className="error">{state.errors.imgUrl}</p>
                )}
              </div>
            </div>

            <label htmlFor="isPublic">
              <b>Is public:</b>
            </label>
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              defaultChecked={state.values?.isPublic}
            />
          </div>
          <button disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </>
  );
}
