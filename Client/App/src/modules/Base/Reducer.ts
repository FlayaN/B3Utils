import { handleActions } from "redux-actions";
import { ActionTypes } from "./Constants";

import { AppNavigator } from "../../Base/AppNavigator";
import { NavigationActions } from "react-navigation";
import { update } from "../../Base/Utilities";

const Reducer = handleActions({
    [ActionTypes.LOG_INFO]: (state: BaseDef, action: Action<string>) => {
        let eventLog = state.eventLog;
        eventLog.push({ type: EventType.Information, message: action.data });
        return update(state, { eventLog: eventLog });
    },
    [ActionTypes.LOG_ERROR]: (state: BaseDef, action: Action<string>) => {
        let eventLog = state.eventLog;
        eventLog.push({ type: EventType.Error, message: action.data });
        return update(state, { eventLog: eventLog });
    },
    [ActionTypes.NAVIGATE]: (state: BaseDef, action: Action<string>) => {
        const newAction = NavigationActions.navigate({ routeName: action.data });
        return updateStateWithNewNavData(newAction, state);
    },
    ["Navigation/BACK"]: (state: BaseDef, action: any) => {
        return updateStateWithNewNavData(action, state);
    },
    ["Navigation/INIT"]: (state: BaseDef, action: any) => {
        return updateStateWithNewNavData(action, state);
    },
    ["Navigation/NAVIGATE"]: (state: BaseDef, action: any) => {
        return updateStateWithNewNavData(action, state);
    },
    ["Navigation/RESET"]: (state: BaseDef, action: any) => {
        return updateStateWithNewNavData(action, state);
    },
    ["Navigation/SET_PARAMS"]: (state: BaseDef, action: any) => {
        return updateStateWithNewNavData(action, state);
    },
    ["Navigation/URI"]: (state: BaseDef, action: any) => {
        return updateStateWithNewNavData(action, state);
    }
}, {});

function updateStateWithNewNavData(action: any, state: BaseDef): BaseDef {
    const nextState = AppNavigator.router.getStateForAction(action, state.navData);
    return update(state, { navData: nextState });
}

export default Reducer;