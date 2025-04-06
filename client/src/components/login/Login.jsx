import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  return (
    <>
      <form>
        <div className="form-container">
          <h1>Login</h1>
          <div className="fields">
            <div className="inputCont">
              <label htmlFor="email">
                <b>Email:</b>
              </label>
              <input
                type="email"
                placeholder="your.mail@gmail.com"
                name="email"
                id="email"
              />

              <div>
                {/* <p className="error">Email is required!</p> */}

                {/* <p className="error">Email is not valid gmail!</p> */}
              </div>
            </div>

            <div className="inputCont">
              <label htmlFor="pass">
                <b>Password:</b>
              </label>
              <input
                type="password"
                placeholder="*******"
                name="pass"
                id="pass"
                minLength="5"
              />

              <div>
                {/* <p className="error">Password is required!</p> */}

                {/* <p className="error">Password must be at least 5 characters!</p> */}
              </div>
            </div>
          </div>
          <button>Login</button>
        </div>
        <div className="register">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </>
  );
}
