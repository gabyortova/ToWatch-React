import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Login from './components/login/Login';
import Register from "./components/register/Register";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
