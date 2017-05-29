import { ActionTypes } from "./Constants";
import { ActionCreatorsMapObject } from "redux";

export interface ActionsMap extends ActionCreatorsMapObject {
    setUsers(users: UserViewModel[]): Action<UserViewModel[]>;
    setInitialized(initialized: boolean): Action<boolean>;
    setUserActivities(userActivities: UserActivities): Action<UserActivities>;
    setSelectedFitnessMode(selectedFitnessMode: string): Action<string>;
}

export const Actions: ActionsMap = {
    setUsers: (users: UserViewModel[]): Action<UserViewModel[]> => {
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
    },
    setSelectedFitnessMode: (selectedFitnessMode: string): Action<string> => {
        return {
            type: ActionTypes.SET_SELECTED_FITNESS_MODE,
            data: selectedFitnessMode
        };
    }
};