import { ActionTypes } from "./Constants";
import { ActionCreatorsMapObject } from "redux";

export interface ActionsMap extends ActionCreatorsMapObject {
    setIdeas(ideas: IdeaViewModel[]): Action<IdeaViewModel[]>;
    setMessages(messages: IdeaMessages): Action<IdeaMessages>;
    addMessages(messages: IdeaMessages): Action<IdeaMessages>;
}

export const Actions: ActionsMap = {
    setIdeas: (ideas: IdeaViewModel[]): Action<IdeaViewModel[]> => {
        return {
            type: ActionTypes.SET_IDEAS,
            data: ideas
        };
    },
    setMessages: (messages: IdeaMessages): Action<IdeaMessages> => {
        return {
            type: ActionTypes.SET_IDEAMESSAGES,
            data: messages
        };
    },
    addMessages: (messages: IdeaMessages): Action<IdeaMessages> => {
        return {
            type: ActionTypes.ADD_IDEAMESSAGES,
            data: messages
        };
    }
};