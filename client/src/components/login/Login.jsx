import { useActionState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLogin } from "./../../api/authApi";
import { UserContext } from "../contexts/UserContex";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { mutateAsync: login } = useLogin();
  const { userLoginHandler } = useContext(UserContext);

  const loginHandler = async (_, formData) => {
    const { email, password } = Object.fromEntries(formData);
    const errors = {};

    if (!email) {
      errors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email is not valid!";
    }

    if (!password) {
      errors.password = "Password is required!";
    }

    if (Object.keys(errors).length > 0) {
      return { errors, values: { email, password } };
    }

    try {
      const authData = await login({ email, password });
      userLoginHandler(authData);

      navigate(-1);

      return { errors: {}, values: { email: "", password: "" } };
    } catch (err) {
      console.error(err);

      const errorMessage =
        err.response?.data?.message || err.message || "Login failed!";
      toast.error(errorMessage);

      return { errors: {}, values: { email, password } };
    }
  };

  const [state, loginAction, isPending] = useActionState(loginHandler, {
    errors: {},
    values: { email: "", password: "" },
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
                defaultValue={state.values?.email}
                required
              />

              <div>
                {state.errors?.email && (
                  <p className="error">{state.errors.email}</p>
                )}
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
                defaultValue={state.values?.password}
                required
              />

              <div>
                {state.errors?.password && (
                  <p className="error">{state.errors.password}</p>
                )}
              </div>
            </div>
          </div>
          <button disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </button>
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
