import { ActionTypes } from "./Constants";
import { ActionCreatorsMapObject } from "redux";
import { Pages } from "../../Base/Constants";
export interface ActionsMap extends ActionCreatorsMapObject {
    navigate(navigationData: NavigateData): Action<NavigateData>;
    logInfo(message: string): Action<string>;
    logError(message: string): Action<string>;
}

export const Actions: ActionsMap = {
    navigate: (navigationData: NavigateData): Action<NavigateData> => {
        return {
            type: ActionTypes.NAVIGATE,
            data: navigationData
        };
    },
    logInfo: (message: Pages): Action<string> => {
        return {
            type: ActionTypes.LOG_INFO,
            data: message
        };
    },
    logError: (message: Pages): Action<string> => {
        return {
            type: ActionTypes.LOG_ERROR,
            data: message
        };
    }
};