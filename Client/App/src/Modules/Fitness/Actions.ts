import { ActionTypes } from "./Constants";
import { ActionCreatorsMapObject } from "redux";

export interface ActionsMap extends ActionCreatorsMapObject {
    setUsers(users: UserViewModel[]): Action<UserViewModel[]>;
    setInitialized(initialized: boolean): Action<boolean>;
    setUserActivities(userActivities: UserActivities): Action<UserActivities>;
    setSelectedFitnessMode(selectedFitnessMode: FitnessType): Action<FitnessType>;
    setSelectedFilterMode(selectedFitnessMode: FilterType): Action<FilterType>;
    setAwards(awards: AwardViewModel[]): Action<AwardViewModel[]>;
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
    setSelectedFitnessMode: (selectedFitnessMode: FitnessType): Action<FitnessType> => {
        return {
            type: ActionTypes.SET_SELECTED_FITNESS_MODE,
            data: selectedFitnessMode
        };
    },
    setSelectedFilterMode: (selectedFitnessMode: FilterType): Action<FilterType> => {
        return {
            type: ActionTypes.SET_SELECTED_FILTER_MODE,
            data: selectedFitnessMode
        };
    },
    setAwards: (awards: AwardViewModel[]): Action<AwardViewModel[]> => {
        return {
            type: ActionTypes.SET_AWARDS,
            data: awards
        };
    }
};