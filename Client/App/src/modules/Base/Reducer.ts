import { handleActions } from "redux-actions";
import { ActionTypes } from "./Constants";

import { AppNavigator } from "../../Base/AppNavigator";
import { NavigationActions } from "react-navigation";

const Reducer = handleActions({
    [ActionTypes.NAVIGATE]: (state: BaseDef, action: Action<string>) => {
        const newAction = NavigationActions.navigate( {routeName: action.data} );
        const nextState = AppNavigator.router.getStateForAction(newAction, state.navData);

        return { ...state, navData: nextState } as BaseDef;
    },
    ["Navigation/BACK"]: (state: BaseDef, action: any) => {
        const nextState = AppNavigator.router.getStateForAction(action, state.navData);
        return { ...state, navData: nextState } as BaseDef;
    },
    ["Navigation/INIT"]: (state: BaseDef, action: any) => {
        const nextState = AppNavigator.router.getStateForAction(action, state.navData);
        return { ...state, navData: nextState } as BaseDef;
    },
    ["Navigation/NAVIGATE"]: (state: BaseDef, action: any) => {
        const nextState = AppNavigator.router.getStateForAction(action, state.navData);
        return { ...state, navData: nextState } as BaseDef;
    },
    ["Navigation/RESET"]: (state: BaseDef, action: any) => {
        const nextState = AppNavigator.router.getStateForAction(action, state.navData);
        return { ...state, navData: nextState } as BaseDef;
    },
    ["Navigation/SET_PARAMS"]: (state: BaseDef, action: any) => {
        const nextState = AppNavigator.router.getStateForAction(action, state.navData);
        return { ...state, navData: nextState } as BaseDef;
    },
    ["Navigation/URI"]: (state: BaseDef, action: any) => {
        const nextState = AppNavigator.router.getStateForAction(action, state.navData);
        return { ...state, navData: nextState } as BaseDef;
    }
}, {});

export default Reducer;