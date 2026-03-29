import { useActionState, useContext } from "react";
import toast from "react-hot-toast";
import { useEditProfile } from "../../api/profileApi";
import { UserContext, useUserContext } from "../contexts/UserContex";

export default function ProfileEdit({ editClickHandler }) {
  const { userUpdateHandler } = useContext(UserContext);
  const { mutateAsync: editProfile } = useEditProfile();
  const { username: currentUsername, email: currentEmail } = useUserContext();

  const submitAction = async (_, formData) => {
    const { username, email } = Object.fromEntries(formData);

    const errors = {};

    if (!username) {
      errors.username = "Username is required!";
    } else if (username.length < 2) {
      errors.username = "Username must be at least 2 characters!";
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      errors.username = "Username must contain only latin letters and digits!";
    }

    if (!email) {
      errors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email is not valid!";
    }

    if (Object.keys(errors).length > 0) {
      return { errors, values: { username, email } };
    }

    try {
      const authData = await editProfile({ username, email });

      userUpdateHandler(authData);

      (toast.success("Profile updated successfully!", {
        duration: 3000,
      }),
        editClickHandler());

      return { errors: {}, values: {} };
    } catch (err) {
      console.error(err);

      const errorMessage =
        err.response?.data?.message || err.message || "Update profile failed!";
      toast.error(errorMessage);

      return { errors: {}, values: { username, email } };
    }
  };

  const [state, formAction, isPending] = useActionState(submitAction, {
    errors: {},
    values: null,
  });

  return (
    <>
      <form action={formAction}>
        <div>
          <div className="inputCont">
            <label htmlFor="username">
              <b>Username:</b>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={state.values?.username ?? currentUsername}
            />
            {state.errors?.username && (
              <p className="error">{state.errors.username}</p>
            )}
          </div>

          <div className="inputCont">
            <label htmlFor="email">
              <b>Email:</b>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={state.values?.email ?? currentEmail}
            />
            {state.errors?.email && (
              <p className="error">{state.errors.email}</p>
            )}
          </div>

          <div className="buttons">
            <button
              onClick={editClickHandler}
              type="button"
              className="button"
              disabled={isPending}
            >
              Cancel
            </button>
            <button className="button" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
