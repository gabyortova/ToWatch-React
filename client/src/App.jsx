import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Login from './components/login/Login';
import Register from "./components/register/Register";
import Catalog from "./components/catalog/Catalog";
import Details from "./components/details/Details";
import CreateVideo from "./components/create-video/CreateVideo";
import EditForm from "./components/edit-form/EditForm";
import ErrorPage from "./components/error-page/ErrorPage";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/details" element={<Details />} />
        <Route path="/create-video" element={<CreateVideo />} />
        <Route path="/edit" element={<EditForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
