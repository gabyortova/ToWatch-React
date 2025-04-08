import ProfileEdit from "./ProfileEdit";
import { useProfile } from "../../api/authApi";
import "./Profile.css";
import { useState } from "react";

export default function Profile() {
  const { user } = useProfile();
  const [isEdit, setIsEdit] = useState(false);

  const editClickHandler = () => {
    setIsEdit(isEdit => !isEdit);
  };

  return (
    <div className="big-container profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        {!isEdit && (
          <>
            <p>
              <strong>Username: </strong>
              {user.username}
            </p>
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>
            <button onClick={editClickHandler}>Edit</button>
          </>
        )}

        {isEdit && <ProfileEdit editClickHandler={editClickHandler}/>}
      </div>
    </div>
  );
}
