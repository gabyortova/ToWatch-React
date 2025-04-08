import { useMyVideos } from "../../api/videoApi";
import CatalogItem from "../catalog/catalog-item/CatalogItem";

export default function MyVideos() {
  const { myVideos } = useMyVideos();
  console.log(myVideos);
  

  return (
    <div className="catalog-container">
      {myVideos.length > 0 ? (
        myVideos.map((video) => <CatalogItem key={video._id} {...video} />)
      ) : (
        <h1 className="big-container no-videos-container">No videos yet</h1>
      )}
    </div>
  );
}
