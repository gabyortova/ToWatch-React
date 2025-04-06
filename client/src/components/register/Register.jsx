import { Link } from "react-router-dom";
import './Register.css'

export default function Register() {
  return (
    <>
      <form>
        <div className="form-container">
          <h1>Register</h1>
          <div className="fields">
            <div className="inputCont">
              <label htmlFor="username">
                <b>Username:</b>
              </label>
              <input
                type="text"
                placeholder="your username"
                name="username"
                id="username"
                minLength="2"
                required
              />
              <div>
                {/* <p className="error">Username must be at least 2 characters!</p> */}
              </div>
            </div>

            <div className="inputCont">
              <label htmlFor="email">
                <b>Email:</b>
              </label>
              <input
                type="text"
                placeholder="your.mail@gmail.com"
                name="email"
                id="email"
                required
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
                required
              />

              <div>
                {/* <p className="error">Password is required!</p> */}

                {/* <p className="error">Password must be at least 5 characters!</p> */}
              </div>
            </div>

            <div className="inputCont">
              <label htmlFor="rePass">
                <b>Repeat password:</b>
              </label>
              <input
                type="password"
                placeholder="*******"
                name="rePass"
                id="rePass"
                required
              />

              <div>
                {/* <p className="error">Passwords don't match!</p> */}
              </div>
            </div>
          </div>
          <button className="registerbtn">Register</button>
        </div>
        <div className="login">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </>
  );
}
