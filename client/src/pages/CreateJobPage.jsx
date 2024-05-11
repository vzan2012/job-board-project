import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createJob } from "../lib/queries";

/**
 * CreateJobPage Component
 *
 * @returns {*}
 */
const CreateJobPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /**
   * Submit Handler
   *
   * @param {*} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const job = await createJob({ title, description });
    console.log(job);
    navigate(`/`);
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
