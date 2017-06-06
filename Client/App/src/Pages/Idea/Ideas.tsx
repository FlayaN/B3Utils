import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationScreenProp } from "react-navigation";
import {
    View,
    Text,
    SectionList,
    TouchableOpacity,
    RefreshControl,
    Button
} from "react-native";

import { Base, Idea } from "../../Modules";
import { GetIdeas } from "../../Base/Utilities";
import { Pages } from "../../Base/Constants";
import Icon from "react-native-vector-icons/Ionicons";
import { baseStyles } from "../../Base/Styles";

interface IStoreProps {
    userID: string;
    ideas: IdeaViewModel[];
}

interface IProps {
    store: IStoreProps;
    baseActions: Base.Actions.ActionsMap;
    ideaActions: Idea.Actions.ActionsMap;
    navigation: NavigationScreenProp<any, any>;
}

interface IState {
    refreshing: boolean;
}

class Ideas extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.updateData = this.updateData.bind(this);
        this.state = {
            refreshing: false
        };
    }
    async updateData() {
        try {
            this.setState({ refreshing: true });
            this.props.ideaActions.setIdeas(await GetIdeas());
        } catch (error) {
            this.props.baseActions.logError(error);
        }
        this.setState({ refreshing: false });
    }
    async componentDidMount() {
        await this.updateData();
    }
    render() {
        let { ideas } = this.props.store;
        return (
            <View style={{ flex: 1 }}>
                <Button title="Skapa ny idé" onPress={() => this.props.baseActions.navigate({ to: Pages.NEWIDEA })} />
                <SectionList
                    renderSectionHeader={({ section }) => <Text style={baseStyles.header}>{section.key}</Text>}
                    keyExtractor={(x: IdeaViewModel) => x.id}
                    refreshControl={<RefreshControl
                        onRefresh={() => { this.updateData(); }}
                        refreshing={this.state.refreshing} />}
                    renderItem={({ item }: { item: IdeaViewModel }) => (
                        <TouchableOpacity onPress={() => { this.props.baseActions.navigate({ to: Pages.IDEA, params: item }); }}>
                            <View style={baseStyles.itemRow}>
                                <View style={[baseStyles.column]}>
                                    <Text style={{ fontWeight: "bold" }}>{item.header}</Text>
                                    <Text>{item.userName}</Text>
                                </View>
                                <Icon name="md-chatboxes" size={25}>{item.messageCount}</Icon>
                            </View>
                        </TouchableOpacity>
                    )}
                    sections={[
                        { data: ideas, key: "Idéer" }
                    ]} />
            </View>
        );
    }
}

function mapStateToProps(state: StoreDef): IProps {
    return {
        store: {
            userID: state.user.googleUser.userID,
            ideas: state.idea.ideas
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(dispatch): IProps {
    return {
        baseActions: bindActionCreators(Base.Actions.Actions, dispatch),
        ideaActions: bindActionCreators(Idea.Actions.Actions, dispatch)
    } as IProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Ideas);