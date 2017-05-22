import { ActionTypes } from "./Constants";
import { ActionCreatorsMapObject } from "redux";

export interface ActionsMap extends ActionCreatorsMapObject {
    setUsers(users: IUserViewModel[]): Action<IUserViewModel[]>;
    setInitialized(initialized: boolean): Action<boolean>;
    setUserActivities(userActivities: UserActivities): Action<UserActivities>;
}

export const Actions: ActionsMap = {
    setUsers: (users: IUserViewModel[]): Action<IUserViewModel[]> => {
        return {
            type: ActionTypes.SET_USERS,
            data: users
        };
    },
    setInitialized: (initialized: boolean): Action<boolean> => {
        return {
            type: ActionTypes.SET_INITIALIZED,
            data: initialized
        };
    },
    setUserActivities: (userActivities: UserActivities): Action<UserActivities> => {
        return {
            type: ActionTypes.SET_ACTIVITIES,
            data: userActivities
        };
    }
};