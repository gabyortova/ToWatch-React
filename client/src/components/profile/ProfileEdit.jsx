import { useContext } from "react";
import { useEditProfile } from "../../api/progileApi";
import { UserContext, useUserContext } from "../contexts/UserContex";

export default function ProfileEdit({ editClickHandler }) {
  const { userUpdateHandler } = useContext(UserContext);
  const { editProfile } = useEditProfile();

  const { username, email } = useUserContext();

  const submitAction = (formData) => {
    const { username, email } = Object.fromEntries(formData);
    editProfile(username, email).then((authData) =>
      userUpdateHandler(authData)
    );

    editClickHandler();
  };

  return (
    <>
      <form action={submitAction}>
        <div>
          <div className="inputCont">
            <label htmlFor="username">
              <b>Username:</b>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              minLength="2"
              defaultValue={username}
            />

            <div>
              {/* <p className="error">Username is required!</p> */}

              {/* <p className="error">Username must be at least 2 characters!</p> */}
            </div>
          </div>
          <div className="inputCont">
            <label htmlFor="email">
              <b>Email:</b>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              defaultValue={email}
            />

            <div>
              {/* <p className="error">Email is required!</p> */}

              {/* <p className="error">Email is not valid gmail!</p> */}
            </div>
          </div>
          <div className="buttons">
            <button onClick={editClickHandler} type="button" className="button">
              Cancel
            </button>
            <button className="button">Save</button>
          </div>
        </div>
      </form>
    </>
  );
}
