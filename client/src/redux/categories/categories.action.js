/*eslint no-useless-computed-key: "off"*/

import CategoriesActionTypes from "./categories.types";
import axios from "axios";

export const fetchCategories = () => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3333/api/v1/todos/categories`, {
        headers: {
          ["Authorization"]: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(getCategories(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteCategories = (id) => {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:3333/api/v1/todos/categories/${id}`, {
        headers: {
          ["Authorization"]: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(removeCategories(id));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const clearCategories = () => {
  return {
    type: CategoriesActionTypes.CLEAR_CATEGORIES,
  };
};

export const createCategories = (categories) => ({
  type: CategoriesActionTypes.CREATE_CATEGORIES,
  payload: categories,
});

const getCategories = (categories) => ({
  type: CategoriesActionTypes.GET_CATEGORIES,
  payload: categories,
});

const removeCategories = (id) => ({
  type: CategoriesActionTypes.REMOVE_CATEGORIES,
  payload: id,
});

// const updateCategories = (categories) => ({
//   type: CategoriesActionTypes.UPDATE_CATEGORIES,
//   payload: categories,
// });

// export const registerSuccess = user => {
//     return {
//         type: UserActionTypes.REGISTER_SUCCESS,
//         payload: user
//     };
// };
