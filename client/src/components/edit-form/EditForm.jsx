import './EditForm.css'

export default function EditForm() {
  return (
    <>
      <form>
        <div className="form-container">
          <h1>Update video</h1>
          <div className="fields">
            <label htmlFor="title">
              <b>Title:</b>
            </label>
            <input type="text" name="title" id="title" required minLength="2" />

            <label>
              <b>Video URL:</b>
            </label>
            <input
              type="text"
              name="videoUrl"
              id="videoUrl"
              required
              minLength="10"
            />

            <label>
              <b>Description:</b>
            </label>
            <textarea
              name="description"
              id="description"
              required
              minLength="5"
              rows="3"
            ></textarea>

            <label>
              <b>Image URL:</b>
            </label>
            <input type="text" name="imgUrl" id="imgUrl" minLength="10" />

            <label>
              <b>Is public:</b>
            </label>
            <input type="checkbox" name="isPublic" id="isPublic" />
          </div>
          <button>Update</button>
        </div>
      </form>
    </>
  );
}
