/*eslint no-useless-computed-key: "off"*/

import TaskActionTypes from "./task.types";
import axios from "axios";

export const fetchTask = () => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3333/api/v1/todos`, {
        headers: {
          ["Authorization"]: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("EH:", res);
        dispatch(getTask(res.data.todos));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const completeTask = (id, state) => {
  return (dispatch) => {
    console.log(state);
    return axios
      .patch(
        `http://localhost:3333/api/v1/todos/${id}`,
        { completed: state },
        {
          headers: {
            ["Authorization"]: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        dispatch(updateTask(res.data));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:3333/api/v1/todos/${id}`, {
        headers: {
          ["Authorization"]: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(removeTask(id));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const clearTask = () => {
  return {
    type: TaskActionTypes.CLEAR_TASK,
  };
};

export const createTask = (task) => ({
  type: TaskActionTypes.CREATE_TASKS,
  payload: task,
});

const getTask = (task) => ({
  type: TaskActionTypes.GET_TASKS,
  payload: task,
});

const removeTask = (id) => ({
  type: TaskActionTypes.REMOVE_TASK,
  payload: id,
});

const updateTask = (task) => ({
  type: TaskActionTypes.UPDATE_TASK,
  payload: task,
});

// export const registerSuccess = user => {
//     return {
//         type: UserActionTypes.REGISTER_SUCCESS,
//         payload: user
//     };
// };
