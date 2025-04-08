import { Link } from "react-router-dom";

export default function CatalogItem({ _id, title, videoUrl, imgUrl }) {
  return (
    <div className="card">
      <img src={imgUrl} />
      <h2>{title}</h2>
      <div className="buttons">
        <a href={videoUrl} className="button" target="_blank">
          Watch Video
        </a>
        <Link to={`/catalog/details/${_id}`} className="button">
          Details
        </Link>
      </div>
    </div>
  );
}
