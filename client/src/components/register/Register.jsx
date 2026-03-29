import { useActionState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRegister } from "../../api/authApi";
import { useUserContext } from "../contexts/UserContex";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const { mutateAsync: register } = useRegister();
  const { userLoginHandler } = useUserContext();

  const registerHandler = async (_, formData) => {
    const { username, email, pass, rePass } = Object.fromEntries(formData);

    const errors = {};

    if (!username) {
      errors.username = "Username is required!";
    } else if (username.length < 2) {
      errors.username = "Username should be at least 2 characters!";
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      errors.username = "Username must contain only latin letters and digits!";
    }

    if (!email) {
      errors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email is not valid!";
    }

    if (!pass) {
      errors.password = "Password is required!";
    } else if (pass.length < 5) {
      errors.password = "Password should be at least 5 characters!";
    } else if (!/[a-zA-Z0-9]/.test(pass)) {
      errors.password = "Password must contain latin letters or digits!";
    }

    if (pass !== rePass) {
      errors.rePass = "Passwords don't match!";
    }

    if (Object.keys(errors).length > 0) {
      return { errors, values: { username, email, pass, rePass } };
    }

    try {
      const authData = await register({
        username,
        email,
        pass,
        rePass,
      });

      userLoginHandler(authData);
      navigate("/");

      return {
        errors: {},
        values: { username: "", email: "", password: "", rePass: "" },
      };
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      const errorMessage =
        err.response?.data?.message || err.message || "Registration failed!";
      toast.error(errorMessage);

      return { errors: {}, values: { username, email, pass, rePass } };
    }
  };

  const [state, formAction, isPending] = useActionState(registerHandler, {
    errors: {},
    values: { username: "", email: "", password: "", rePass: "" },
  });

  return (
    <>
      <form action={formAction}>
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
                defaultValue={state.values?.username}
                required
              />
              <div>
                {state.errors?.username && (
                  <p className="error">{state.errors.username}</p>
                )}
              </div>
            </div>

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
              <label htmlFor="pass">
                <b>Password:</b>
              </label>
              <input
                type="password"
                placeholder="*******"
                name="pass"
                id="pass"
                defaultValue={state.values?.pass}
                required
              />
              <div>
                {state.errors?.password && (
                  <p className="error">{state.errors.password}</p>
                )}
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
                defaultValue={state.values?.rePass}
                required
              />
              <div>
                {state.errors?.rePass && (
                  <p className="error">{state.errors.rePass}</p>
                )}
              </div>
            </div>
          </div>
          <button disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
          </button>
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
