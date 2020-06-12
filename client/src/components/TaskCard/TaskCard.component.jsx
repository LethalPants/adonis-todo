import React, { useState } from "react";
import { connect } from "react-redux";

import { completeTask, deleteTask } from "../../redux/task/task.action";
import "./taskCard.styles.css";

const TaskCard = ({ task, completeTask, deleteTask }) => {
  const [completed, setCompleted] = useState(task.completed);

  const completedTask = () => {
    setCompleted(!task.completed);
    completeTask(task.id, !task.completed);
  };

  const deletedTask = () => {
    deleteTask(task.id);
  };

  return (
    <div
      className={`uk-card uk-card-default uk-card-body ${
        completed ? "disabled-card" : ""
      }`}
    >
      <div
        className={`uk-card-badge uk-label ${
          completed ? "disabled-badge" : ""
        }`}
      >
        {task.created_at}
      </div>
      <p className={`${completed ? "uk-text-muted" : ""} desc-min`}>
        {task.todo}
      </p>
      {completed ? (
        <span
          uk-icon={"close"}
          className="uk-margin-small-right"
          onClick={completedTask}
        ></span>
      ) : (
        <span
          uk-icon={"check"}
          className="uk-margin-small-right"
          onClick={completedTask}
        ></span>
      )}
      <span uk-icon={"trash"} onClick={deletedTask}></span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  completeTask: (id, state) => dispatch(completeTask(id, state)),
  deleteTask: (id) => dispatch(deleteTask(id)),
});

export default connect(null, mapDispatchToProps)(TaskCard);
