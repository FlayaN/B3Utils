import { handleActions } from "redux-actions";
import { ActionTypes } from "./Constants";
import { update } from "../../Base/Utilities";
import { GiftedChat } from "react-native-gifted-chat";

const Reducer = handleActions({
    [ActionTypes.SET_IDEAS]: (state: IdeaDef, action: Action<IdeaViewModel[]>) => {
        return update(state, { ideas: action.data });
    },
    [ActionTypes.SET_IDEAMESSAGES]: (state: IdeaDef, action: Action<IdeaMessages>) => {
        const ideaMessages = { ...state.ideaMessages, [action.data.ideaId]: action.data.messages };
        return update(state, { ideaMessages });
    },
    [ActionTypes.ADD_IDEAMESSAGES]: (state: IdeaDef, action: Action<IdeaMessages>) => {
        // const ideaMessages = { ...state.ideaMessages, [action.data.ideaId]: action.data.messages };
        let messages = state.ideaMessages[action.data.ideaId];

        messages = GiftedChat.append(messages, action.data.messages); // Test with GiftedChat append

        const ideaMessages = { ...state.ideaMessages, [action.data.ideaId]: messages };

        return update(state, { ideaMessages });
    }
}, {});

export default Reducer;