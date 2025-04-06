import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Login from './components/login/Login';

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
