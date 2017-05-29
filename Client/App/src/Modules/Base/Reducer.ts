import { handleActions } from "redux-actions";
import { ActionTypes } from "./Constants";

import { StackNav } from "../../Base/Router";
import { NavigationActions } from "react-navigation";
import { update } from "../../Base/Utilities";

const Reducer = handleActions({
    [ActionTypes.LOG_INFO]: (state: BaseDef, action: Action<string>) => {
        const eventLog = [...state.eventLog, { type: EventType.Information, message: action.data }];
        return update(state, { eventLog });
    },
    [ActionTypes.LOG_ERROR]: (state: BaseDef, action: Action<string>) => {
        const eventLog = [...state.eventLog, { type: EventType.Error, message: action.data }];
        return update(state, { eventLog: eventLog });
    },
    [ActionTypes.NAVIGATE]: (state: BaseDef, action: Action<NavigateData>) => {
        const { routes } = state.navData;
        if (action.data.to !== routes[routes.length - 1].routeName) { // Only navigate if its a new route
            const newAction = NavigationActions.navigate({ routeName: action.data.to, params: action.data.params });
            return updateStateWithNewNavData(state, newAction);
        }
        return state;
    },
    ["Navigation/BACK"]: (state: BaseDef, action: any) => {
        return updateStateWithNewNavData(state, action);
    },
    ["Navigation/INIT"]: (state: BaseDef, action: any) => {
        return updateStateWithNewNavData(state, action);
    },
    ["Navigation/NAVIGATE"]: (state: BaseDef, action: any) => {
        return updateStateWithNewNavData(state, action);
    },
    ["Navigation/RESET"]: (state: BaseDef, action: any) => {
        return updateStateWithNewNavData(state, action);
    },
    ["Navigation/SET_PARAMS"]: (state: BaseDef, action: any) => {
        return updateStateWithNewNavData(state, action);
    },
    ["Navigation/URI"]: (state: BaseDef, action: any) => {
        return updateStateWithNewNavData(state, action);
    }
}, {});

function updateStateWithNewNavData(state: BaseDef, action: any): BaseDef {
    const navData = StackNav.router.getStateForAction(action, state.navData);
    return update(state, { navData });
}

export default Reducer;