import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="container-home">
        <h1>Welcome to our video collection platform ToWatch📹!</h1>
        <div className="description">
          Here, you can create your personalized collection of videos from
          different websites that you love or want to watch later. Unlike
          traditional bookmarks that can be messy and easy to forget, our site
          provides a clean and organized way to keep track of your favorite
          content. Our platform allows you to:
        </div>

        <div className="list">
          <ul>
            <li>
              <strong>Create your video collection:</strong> Gather videos form
              any website like{" "}
              <a href="https://www.youtube.com/" target="_blank">
                YouTube
              </a>
              ,{" "}
              <a href="https://vimeo.com/" target="_blank">
                Vimeo
              </a>
              ,{" "}
              <a href="https://www.tiktok.com/explore" target="_blank">
                TikTok
              </a>{" "}
              and many more.
            </li>
            <li>
              <strong>Share your favorite videos:</strong> Share with friends or
              keep them private
            </li>
            <li>
              <strong>Watch later:</strong> Mark videos you want to come back
              to.
            </li>
          </ul>
          <p className="description">
            This platform is perfect for anyone who loves watching videos but
            wants a better, more organized way to keep track of them. ✨
          </p>
        </div>
      </div>
    </>
  );
}
