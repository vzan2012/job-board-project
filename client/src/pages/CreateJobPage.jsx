import { useState } from "react";

/**
 * CreateJobPage Component
 *
 * @returns {*}
 */
const CreateJobPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /**
   * Submit Handler
   *
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("should post a new job", { title, description });
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;
