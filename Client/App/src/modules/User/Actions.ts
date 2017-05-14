import { ActionTypes } from "./Constants";
import { ActionCreatorsMapObject } from "redux";

export interface ActionsMap extends ActionCreatorsMapObject {
    setName(name: string): Action<string>;
}

export const Actions: ActionsMap = {
    setName: (name: string): Action<string> => {
        return {
            type: ActionTypes.SET_NAME,
            data: name
        };
    }
};