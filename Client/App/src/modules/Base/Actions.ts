import { ActionTypes } from "./Constants";
import { ActionCreatorsMapObject } from "redux";
import { Pages } from "../../Constants";
export interface ActionsMap extends ActionCreatorsMapObject {
    navigate(to: Pages): Action<string>;
}

export const Actions: ActionsMap = {
    navigate: (to: Pages): Action<string> => {
        return {
            type: ActionTypes.NAVIGATE,
            data: to
        };
    }
};