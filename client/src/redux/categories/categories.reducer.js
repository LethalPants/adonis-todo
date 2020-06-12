import CategoriesActionTypes from "./categories.types";

const INITIAL_STATE = {
  categories: [],
};

const CategoryReducer = (state = INITIAL_STATE, action) => {
  let copyList = [];
  let delList = [];
  switch (action.type) {
    case CategoriesActionTypes.CREATE_CATEGORIES:
      copyList = state.categories;
      copyList.push(action.payload);
      return { ...state, categories: copyList };

    case CategoriesActionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case CategoriesActionTypes.CLEAR_CATEGORIES:
      return {
        categories: [],
      };

    case CategoriesActionTypes.REMOVE_CATEGORIES:
      delList = state.categories;
      delList = delList.filter((item) => item.id !== action.payload);
      return { ...state, categories: delList };

    case CategoriesActionTypes.UPDATE_CATEGORIES:
      return {
        ...state,
        categories: state.categories.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    default:
      return state;
  }
};

export default CategoryReducer;
