import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationProp, NavigationRoute } from "react-navigation";

import {
    View,
    Text
} from "react-native";

import { GetMessages, AddMessage } from "../Base/Utilities";
import { Idea } from "../Modules";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment";

interface IStoreProps {
    idea: IdeaViewModel;
    messages: MessageViewModel[];
    userId: string;
    userName: string;
}

interface IProps {
    store: IStoreProps;
    ideaActions: Idea.Actions.ActionsMap;
    navigation: NavigationProp<NavigationRoute<IdeaViewModel>, any>;
}

class IdeaPage extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.updateData = this.updateData.bind(this);
        this.onSend = this.onSend.bind(this);
    }
    async updateData() {
        const ideaId = this.props.navigation.state.params.id;
        const messages = await GetMessages(ideaId);
        console.log(messages);
        this.props.ideaActions.setMessages({ ideaId, messages });
    }
    async componentDidMount() {
        await this.updateData();
    }
    async onSend(messages = []) {
        const ideaId = this.props.navigation.state.params.id;

        const mappedMessages: MessageViewModel[] = messages.map((message) => {
            console.log(message);
            return {
                id: message._id,
                userId: message.user._id,
                ideaId: ideaId,
                text: message.text,
                timeStamp: moment(message.createdAt).format(),
                userName: message.user.name
            };
        });

        // TODO add message to signalr :)

        await mappedMessages.forEach(async (mappedMessage) => {
            await AddMessage(mappedMessage);
        });

        this.props.ideaActions.addMessages({ ideaId, messages: mappedMessages });
    }
    render() {
        const { idea, messages } = this.props.store;
        if (idea === undefined) {
            return undefined;
        }
        let mappedMessages = [];
        if (messages !== undefined) {
            console.log(messages);
            mappedMessages = messages.map((message) => {
                return {
                    _id: message.id,
                    text: message.text,
                    createdAt: message.timeStamp,
                    user: {
                        _id: message.userId,
                        name: message.userName
                    }
                };
            });
            console.log(mappedMessages);
        }

        return (
            <View style={{ flex: 1, margin: 20 }}>
                <Text>{idea.detail}</Text>
                <GiftedChat
                    messages={mappedMessages}
                    onSend={this.onSend}
                    user={{
                        _id: this.props.store.userId,
                        name: this.props.store.userName
                    }} />
            </View>
        );
    }
}

function mapStateToProps(state: StoreDef, ownProps: IProps): IProps {
    return {
        store: {
            idea: state.idea.ideas.find((idea) => idea.id === ownProps.navigation.state.params.id),
            userId: state.user.googleUser.userID,
            messages: state.idea.ideaMessages[ownProps.navigation.state.params.id],
            userName: state.user.googleUser.name
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(dispatch: any): IProps {
    return Object.assign({ dispatch: dispatch }, {
        ideaActions: bindActionCreators(Idea.Actions.Actions, dispatch)
    } as IProps);
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeaPage);