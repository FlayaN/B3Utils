import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationScreenProp } from "react-navigation";
import {
    View,
    Text,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
    Button
} from "react-native";

import { Base, Idea } from "../Modules";
import { GetIdeas } from "../Base/Utilities";
import { Pages } from "../Base/Constants";
import Icon from "react-native-vector-icons/Ionicons";

interface IStoreProps {
    userID: string;
    ideas: IdeaViewModel[];
}

interface IListItem {
    index: number;
    item: IdeaViewModel;
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
        ideas = ideas.map(item => { return { ...item, key: item.id }; });
        return (
            <View style={{ flex: 1 }}>
                <Button title="Skapa ny idé" onPress={() => this.props.baseActions.navigate({ to: Pages.NEWIDEA })} />
                <SectionList
                    renderSectionHeader={({ section }) => <Text style={styles.header}>{section.key}</Text>}
                    refreshControl={<RefreshControl
                        onRefresh={() => { this.updateData(); }}
                        refreshing={this.state.refreshing} />}
                    renderItem={(item: IListItem) => (
                        <TouchableOpacity onPress={() => { this.props.baseActions.navigate({ to: Pages.IDEA, params: item.item }); }}>
                            <View style={styles.itemRow}>
                                <View style={[styles.column]}>
                                    <Text style={{ fontWeight: "bold" }}>{item.item.header}</Text>
                                    <Text>{item.item.userName}</Text>
                                </View>
                                <Icon name="md-chatboxes" size={25}>{item.item.messageCount}</Icon>
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

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: "row",
        margin: 10,
        maxHeight: 60
    },
    header: {
        fontWeight: "bold",
        fontSize: 18,
        margin: 10,
        marginTop: 0
    },
    column: {
        marginLeft: 10,
        flex: 1
    }
});

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