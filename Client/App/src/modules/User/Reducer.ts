import { handleActions } from "redux-actions";
import { ActionTypes } from "./Constants";
import { update } from "../../Base/Utilities";

const Reducer = handleActions({
    [ActionTypes.SET_GOOGLEUSER]: (state: UserDef, action: Action<GoogleUser>) => {
        return update(state, { googleUser: action.data });
    },
    [ActionTypes.SET_AVATAR]: (state: UserDef, action: Action<string>) => {
        return update(state, { avatarUrl: action.data });
    }
}, {});

export default Reducer;