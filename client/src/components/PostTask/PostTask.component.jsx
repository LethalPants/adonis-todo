import React from "react";
import "./PostTask.styles.css";

const PostTask = ({ handleSubmit, handleChange, description, cat }) => {
  return (
    <>
      <div
        className={`${
          cat ? `category` : ""
        } uk-card uk-card-primary uk-card-body`}
      >
        {cat ? null : <h4>New todo</h4>}
        <form onSubmit={handleSubmit}>
          <textarea
            name={`${cat ? `categories` : `todo`}`}
            className={`${cat ? `category-ta` : ``} uk-textarea uk-form-large`}
            onChange={handleChange}
            value={description}
          ></textarea>
          <button
            className={`${
              cat ? `category-button` : ``
            } uk-button uk-button-default uk-margin-top`}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PostTask;
