import { handleActions } from "redux-actions";
import { ActionTypes } from "./Constants";
import { update } from "../../Base/Utilities";

const Reducer = handleActions({
    [ActionTypes.SET_USERS]: (state: FitnessDef, action: Action<IUserViewModel[]>) => {
        return update(state, { users: action.data });
    },
    [ActionTypes.SET_INITIALIZED]: (state: FitnessDef, action: Action<boolean>) => {
        return update(state, { initialized: action.data });
    }
}, {});

export default Reducer;