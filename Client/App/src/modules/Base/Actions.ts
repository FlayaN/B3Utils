import { ActionTypes } from "./Constants";
import { ActionCreatorsMapObject } from "redux";
import { Pages } from "../../Base/Constants";
export interface ActionsMap extends ActionCreatorsMapObject {
    navigate(to: Pages): Action<string>;
    logInfo(message: string): Action<string>;
    logError(message: string): Action<string>;
}

export const Actions: ActionsMap = {
    navigate: (to: Pages): Action<string> => {
        return {
            type: ActionTypes.NAVIGATE,
            data: to
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