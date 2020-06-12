import UserActionTypes from './user.types';

const INITIAL_STATE = { user: null };

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        case UserActionTypes.LOG_IN_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
