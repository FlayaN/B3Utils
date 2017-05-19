import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
    View,
    Text,
    SectionList,
    Image,
    StyleSheet,
    Button
} from "react-native";

import { Fitness } from "../modules";
import { GetUsers, GetUser, AddActivity } from "../Base/Utilities";
import GoogleFit from "react-native-google-fit";

interface IStoreProps {
    email: string;
    users: IUserViewModel[];
    userID: string;
}

interface IListItem {
    index: number;
    item: IUserViewModel;
}

interface IProps {
    store: IStoreProps;
    fitnessActions: Fitness.Actions.ActionsMap;
}

class TestPage extends React.Component<IProps, {}> {
    static navigationOptions = {
        title: "Fitness"
    };
    constructor(props: IProps) {
        super(props);
        this.updateData = this.updateData.bind(this);
        this.state = {
            listData: []
        };
    }
    async updateData() {
        this.props.fitnessActions.setUsers(await GetUsers());

        const currUser = await GetUser(this.props.store.userID);

        GoogleFit.getDailyDistanceSamples({
            startDate: currUser.lastRecordedDate,
            endDate: new Date().toISOString()
        }, (data, extra) => {
            if (data === false) {
                extra.forEach(item => {
                    AddActivity({
                        userId: this.props.store.userID,
                        amount: item.distance,
                        startDate: item.startDate,
                        endDate: item.endDate,
                        type: "getDailyDistanceSamples"
                    });
                });
            }
        });
    }
    async componentDidMount() {
        await this.updateData();
    }
    render() {
        let { users } = this.props.store;
        users = users.map(item => { return { ...item, key: item.userId }; });
        console.log("render", users);
        return (
            <View>
                <Button title="Refresh" onPress={this.updateData}>Refresh2</Button>
                <Text>
                    User: {this.props.store.email}
                </Text>
                <SectionList
                    renderSectionHeader={({ section }) => <Text style={styles.header}>{section.key}</Text>}
                    renderItem={(item: IListItem) => (
                        <View style={styles.itemRow}>
                            <Image style={{ width: 50, height: 50 }} source={{ uri: item.item.avatarUrl }} />
                            <Text style={styles.column}>{item.item.name}</Text>
                            <Text style={styles.column}>{item.item.totalDistance}m</Text>
                        </View>
                    )}
                    sections={[
                        { data: users, key: "Längst sträcka" }
                    ]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: "row",
        margin: 10
    },
    header: {
        fontWeight: "bold",
        fontSize: 18,
        margin: 10
    },
    column: {
        marginLeft: 10
    }
});

function mapStateToProps(state: StoreDef): IProps {
    return {
        store: {
            email: state.user.googleUser.email,
            users: state.fitness.users,
            userID: state.user.googleUser.userID
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(dispatch): IProps {
    return {
        fitnessActions: bindActionCreators(Fitness.Actions.Actions, dispatch)
    } as IProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);