import { useState } from "react";
// import { useProfile } from "../../api/progileApi";
import ProfileEdit from "./ProfileEdit";
import "./Profile.css";
import { useUserContext } from './../contexts/UserContex';

export default function Profile() {
  // const { user } = useProfile();
  const [isEdit, setIsEdit] = useState(false);
  const {username, email} = useUserContext();
  
  const editClickHandler = () => {
    setIsEdit((isEdit) => !isEdit);
  };

  return (
    <div className="big-container profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        {!isEdit && (
          <>
            <p>
              <strong>Username: </strong>
              {username}
            </p>
            <p>
              <strong>Email: </strong>
              {email}
            </p>
            <button onClick={editClickHandler}>Edit</button>
          </>
        )}

        {isEdit && <ProfileEdit editClickHandler={editClickHandler}/>}
      </div>
    </div>
  );
}
