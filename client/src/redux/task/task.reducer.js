import TaskActionTypes from "./task.types";

const INITIAL_STATE = {
  tasks: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  let copyList = [];
  let delList = [];
  switch (action.type) {
    case TaskActionTypes.CREATE_TASKS:
      copyList = state.tasks.slice();
      copyList.unshift(action.payload);
      return { ...state, tasks: copyList };
    case TaskActionTypes.GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    case TaskActionTypes.CLEAR_TASK:
      return {
        tasks: [],
      };
    case TaskActionTypes.REMOVE_TASK:
      delList = state.tasks;
      delList = delList.filter((item) => item.id !== action.payload);
      return { ...state, tasks: delList };
    case TaskActionTypes.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
