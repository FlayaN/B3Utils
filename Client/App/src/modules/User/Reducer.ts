import { handleActions } from "redux-actions";
import { ActionTypes } from "./Constants";

const Reducer = handleActions({
    [ActionTypes.SET_NAME]: (state: UserDef, action: Action<string>) => {
        return Object.assign({}, state, {
            name: action.data
        } as UserDef);
    }
}, {});

export default Reducer;