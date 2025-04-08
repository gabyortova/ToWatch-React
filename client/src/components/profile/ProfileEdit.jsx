export default function ProfileEdit({
    editClickHandler
}) {
  return (
    <>
      <form>
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
            <input type="email" id="email" name="email" required />

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
