import { useLayoutEffect } from "react";
import { Routes, Route } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import UserProvider from "./providers/UserProvider";
import { useLoading } from "./providers/loadingContext";
import { setLoadingHandlers } from "./utils/request";
import "./App.scss";

import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Catalog from "./components/catalog/Catalog";
import Details from "./components/details/Details";
import CreateVideo from "./components/create-video/CreateVideo";
import EditForm from "./components/edit-form/EditForm";
import ErrorPage from "./components/error-page/ErrorPage";
import Profile from "./components/profile/Profile";
import MyVideos from "./components/my-videos/MyVideos";
import GuestGuard from "./components/guards/GuestGuard";
import AuthGuard from "./components/guards/AuthGuard";

function App() {
  const { startLoading, stopLoading, isLoading } = useLoading();

  useLayoutEffect(() => {
    setLoadingHandlers({ startLoading, stopLoading });
  }, [startLoading, stopLoading]);

  return (
    <UserProvider>
      <Header />
      {isLoading && (
        <div className="global-loader-overlay">
          <div className="global-loader-spinner">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          </div>
        </div>
      )}

      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route element={<GuestGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/details/:videoId" element={<Details />} />
          <Route element={<AuthGuard />}>
            <Route path="/my-videos" element={<MyVideos />} />
            <Route path="/create-video" element={<CreateVideo />} />
            <Route path="/edit/:videoId" element={<EditForm />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </UserProvider>
  );
}

export default App;
