import { handleActions } from "redux-actions";
import { ActionTypes } from "./Constants";

const Reducer = handleActions({
    [ActionTypes.SET_USERS]: (state: FitnessDef, action: Action<IUserViewModel[]>) => {
        return Object.assign({}, state, {
            users: action.data
        } as FitnessDef);
    }
}, {});

export default Reducer;