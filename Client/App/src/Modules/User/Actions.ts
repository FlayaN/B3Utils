import { ActionTypes } from "./Constants";
import { ActionCreatorsMapObject } from "redux";

export interface ActionsMap extends ActionCreatorsMapObject {
    setGoogleUser(googleUser: GoogleUser): Action<GoogleUser>;
    setAvatar(avatar: string): Action<string>;
}

export const Actions: ActionsMap = {
    setGoogleUser: (googleUser: GoogleUser): Action<GoogleUser> => {
        return {
            type: ActionTypes.SET_GOOGLEUSER,
            data: googleUser
        };
    },
    setAvatar: (avatar: string): Action<string> => {
        return {
            type: ActionTypes.SET_AVATAR,
            data: avatar
        };
    }
};