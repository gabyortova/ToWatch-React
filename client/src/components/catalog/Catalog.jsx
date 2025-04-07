import { useVideos } from "../../api/videoApi";
import CatalogItem from "./catalog-item/CatalogItem";
import "./Catalog.css";

export default function Catalog() {
  const { videos } = useVideos();

  return (
    <div className="catalog-container">
      {videos.length > 0 ? (
        videos.map((video) => <CatalogItem key={video._id} {...video} />)
      ) : (
        <h1 className="big-container no-videos-container">No videos yet</h1>
      )}
    </div>
  );
}
