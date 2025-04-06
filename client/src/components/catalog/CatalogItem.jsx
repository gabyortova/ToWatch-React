import { Link } from "react-router-dom";

export default function CatalogItem({
  video
}) {
    return (
        <div className="card">
        <img src={video?.imgUrl} />
        <h2>video.title</h2>
        <div className="buttons">
          <a href={video?.videoUrl} className="button" target="_blank">Watch Video</a>
          <Link to="/catalog/details" className="button">Details</Link>
        </div>
      </div>
    );
}