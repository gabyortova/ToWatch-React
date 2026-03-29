import { Link } from "react-router-dom";
import { useLogout } from "../../api/authApi";
import useAuth from "../hooks/useAuth";
import "./Header.scss";

export default function Header() {
  const { username, isAuthenticated } = useAuth();
  const { logout } = useLogout();

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
                <a onClick={logout}>Logout</a>
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
