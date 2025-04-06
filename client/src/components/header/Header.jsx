import './Header.css'
import { Link } from "react-router-dom";

export default function Header() {
  let isLoggedIn = true;

  return (
    <header>
      {/* <Link to="/">
        <img src="./img/logoToWatch.png" className="logo" />
      </Link> */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/my-videos">My videos</Link>
              </li>
              <li>
                <Link to="/create-video">Create video</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/profile">Hello, username!</Link>
            </li>
            {/* <li><a (click)="logout()">Logout</Link></li> */}
          </>
        )}
        {!isLoggedIn && (
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
