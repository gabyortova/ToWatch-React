import "./Details.css"
import { Link } from "react-router-dom";

export default function Details({ video }) {
  return (
    <div className="big-container details-container">
      <h1>Video Details</h1>
      <h2>Title:</h2>
      <p>video.title</p>

      <img src={video?.imgUrl} alt="img" />
      <h2>Description:</h2>
      <p>video.description</p>

      <h2>Created at:</h2>
      <p>video.created_at</p>

      <div className="buttons">
        <a href={video?.videoUrl} className="button" target="_blank">
          Watch Video
        </a>

        <Link to="/edit" className="button">
          Edit
        </Link>
        <Link to="/delete/{video._id}" className="button">
          Delete
        </Link>
      </div>
    </div>
  );
}
