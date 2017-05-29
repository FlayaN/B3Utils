import { handleActions } from "redux-actions";
import { ActionTypes } from "./Constants";
import { update } from "../../Base/Utilities";

const Reducer = handleActions({
    [ActionTypes.SET_USERS]: (state: FitnessDef, action: Action<UserViewModel[]>) => {
        return update(state, { users: action.data });
    },
    [ActionTypes.SET_INITIALIZED]: (state: FitnessDef, action: Action<boolean>) => {
        return update(state, { initialized: action.data });
    },
    [ActionTypes.SET_ACTIVITIES]: (state: FitnessDef, action: Action<UserActivities>) => {
        const activitiesData = { ...state.activitiesData, [action.data.userId]: action.data.activities };
        return update(state, { activitiesData });
    },
    [ActionTypes.SET_SELECTED_FITNESS_MODE]: (state: FitnessDef, action: Action<string>) => {
        return update(state, { selectedFitnessMode: action.data });
    }
}, {});

export default Reducer;