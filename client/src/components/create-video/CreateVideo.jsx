import { useNavigate } from "react-router";
import { useCrateVideo } from "../../api/videoApi";

export default function CreateVideo() {
  const navigate = useNavigate();
  const { create: crateVideo } = useCrateVideo();

  const submitAction = (formData) => {
    let { title, videoUrl, description, imgUrl, isPublic } =
      Object.fromEntries(formData);

    if (isPublic == "on") {
      isPublic = true;
    } else {
      isPublic = false;
    }

    const videoData = { title, videoUrl, description, imgUrl, isPublic };

    crateVideo(videoData);

    navigate(`/catalog`);
  };

  return (
    <>
      <form action={submitAction}>
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
                required
                minLength="2"
              />

              <div>
                {/* <p className="error">Title is required!</p> */}

                {/* <p className="error">Title must be at least 2 characters!</p> */}
              </div>
            </div>

            <div className="inputCont">
              <label>
                <b>Video URL:</b>
              </label>
              <input
                type="text"
                name="videoUrl"
                id="videoUrl"
                required
                minLength="10"
              />

              <div>
                {/* <p className="error">Video URL is required!</p> */}

                {/* <p className="error">
                  Video URL must be at least 10 characters!
                </p> */}
              </div>
            </div>

            <div className="inputCont">
              <label>
                <b>Description:</b>
              </label>
              <textarea
                name="description"
                id="description"
                required
                minLength="5"
                rows="3"
              ></textarea>

              <div>
                {/* <p className="error">Description is required!</p> */}

                {/* <p className="error">
                  Description must be at least 5 characters!
                </p> */}
              </div>
            </div>

            <div className="inputCont">
              <label>
                <b>Image URL:</b>
              </label>
              <input type="text" name="imgUrl" id="imgUrl" minLength="10" />
              <div>
                {/* <p className="error">
                  Image URL must be at least 10 characters!
                </p> */}
              </div>
            </div>

            <label>
              <b>Is public:</b>
            </label>
            <input type="checkbox" name="isPublic" id="isPublic" />
          </div>
          <button>Create</button>
        </div>
      </form>
    </>
  );
}
