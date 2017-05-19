import { handleActions } from "redux-actions";
import { ActionTypes } from "./Constants";

const Reducer = handleActions({
    [ActionTypes.SET_GOOGLEUSER]: (state: UserDef, action: Action<GoogleUser>) => {
        return Object.assign({}, state, {
            googleUser: action.data
        } as UserDef);
    },
    [ActionTypes.SET_AVATAR]: (state: UserDef, action: Action<string>) => {
        return Object.assign({}, state, {
            avatarUrl: action.data
        } as UserDef);
    }
}, {});

export default Reducer;