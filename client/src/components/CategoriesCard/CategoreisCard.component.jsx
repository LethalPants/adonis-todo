import React, { useState } from "react";
import { connect } from "react-redux";

import { deleteCategories } from "../../redux/categories/categories.action";
import "./CategoriesCard.styles.css";

const TaskCard = ({ category, deleteCategories }) => {
  const deletedTask = () => {
    deleteCategories(category.id);
  };

  return (
    <div
      className={`uk-card uk-card-default uk-card-body disabled-card`}
      style={{ width: 150 }}
    >
      <p className={` uk-text-muted desc-min`}>{`${
        category && category.name ? category.name : ``
      }`}</p>
      <span uk-icon={"trash"} onClick={deletedTask}></span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteCategories: (id) => dispatch(deleteCategories(id)),
});

export default connect(null, mapDispatchToProps)(TaskCard);
