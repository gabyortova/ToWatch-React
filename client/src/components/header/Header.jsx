import "./Header.css";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useUserContext } from "../contexts/UserContex";

export default function Header() {
  const { username, isAuthenticated } = useAuth();
  const { userLogoutHandler } = useUserContext();

  return (
    <header>
      <Link to="/">
        <img src="/images/logoToWatch.png" className="logo" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/my-videos">My videos</Link>
              </li>
              <li>
                <Link to="/create-video">Create video</Link>
              </li>
              <li>
                <Link to="/profile">Hello, {username}!</Link>
              </li>
              <li>
                <a onClick={userLogoutHandler}>Logout</a>
              </li>
            </>
          )}
        </ul>
      </nav>
      <ul>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
