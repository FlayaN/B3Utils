import { ActionTypes } from "./Constants";
import { ActionCreatorsMapObject } from "redux";




export interface ActionsMap extends ActionCreatorsMapObject {
    setUsers(users: IUserViewModel[]): Action<IUserViewModel[]>;
}

export const Actions: ActionsMap = {
    setUsers: (users: IUserViewModel[]): Action<IUserViewModel[]> => {
        return {
            type: ActionTypes.SET_USERS,
            data: users
        };
    }
};