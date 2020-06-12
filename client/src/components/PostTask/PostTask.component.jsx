import React from "react";
import "./PostTask.styles.css";

const PostTask = ({ handleSubmit, handleChange, todo }) => {
  return (
    <>
      <div className="uk-card uk-card-primary uk-card-body">
        <h4>New Todo</h4>
        <form onSubmit={handleSubmit}>
          <textarea
            className="uk-textarea uk-form-large"
            onChange={handleChange}
            value={todo}
          ></textarea>
          <button className="uk-button uk-button-default uk-margin-top">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PostTask;
