import { useActionState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "./../../api/authApi";
import { UserContext } from "../contexts/UserContex";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { userLoginHandler } = useContext(UserContext);
  const { login } = useLogin();

  const loginHandler = async (_, formData) => {
    const values = Object.fromEntries(formData);

    try {
      const authData = await login(values.email, values.password);
      userLoginHandler(authData);

      navigate(-1);
    } catch (err) {
      //TODO
      console.log(err);
    }
  };

  const [_, loginAction, isPending] = useActionState(loginHandler, {
    email: "",
    password: "",
  });

  return (
    <>
      <form action={loginAction}>
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
                required
              />

              <div>
                {/* <p className="error">Email is required!</p> */}

                {/* <p className="error">Email is not valid gmail!</p> */}
              </div>
            </div>

            <div className="inputCont">
              <label htmlFor="password">
                <b>Password:</b>
              </label>
              <input
                type="password"
                placeholder="*******"
                name="password"
                id="password"
                minLength="5"
                required
              />

              <div>
                {/* <p className="error">Password is required!</p> */}

                {/* <p className="error">Password must be at least 5 characters!</p> */}
              </div>
            </div>
          </div>
          <button disabled={isPending}>Login</button>
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
