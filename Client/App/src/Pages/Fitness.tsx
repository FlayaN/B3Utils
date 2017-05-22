import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
    View,
    Text,
    SectionList,
    Image,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
    Platform
} from "react-native";

import { Fitness, Base } from "../Modules";
import { GetUsers, GetUser, AddActivity, getDates } from "../Base/Utilities";
import { Pages } from "../Base/Constants";
import GoogleFit from "react-native-google-fit";
import AppleHealthKit from "react-native-apple-healthkit";

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
    baseActions: Base.Actions.ActionsMap;
}

interface IState {
    refreshing: boolean;
}

class FitnessPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.updateData = this.updateData.bind(this);
        this.getDistances = this.getDistances.bind(this);
        this.state = {
            refreshing: false
        };
    }
    getDistances(startDate: Date, endDate: Date): Promise<IActivityViewModel[]> {
        return new Promise((resolve, reject) => {
            let activities: IActivityViewModel[] = [];
            if (Platform.OS === "ios") {
                getDates(startDate, endDate).forEach(date => {
                    const options = {
                        date: date
                    };
                    AppleHealthKit.getDistanceWalkingRunning(options, (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            this.props.baseActions.logInfo(`getDistanceWalkingRunning: ${res}`);
                        }
                    });
                });
            } else {
                GoogleFit.getDailyDistanceSamples({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            }, (data, extra) => {
                if (data === false) {
                    extra.forEach(item => {
                        console.log("DailyDistSample", item);
                        let tmpDate = new Date(item.endDate);
                        tmpDate.setHours(tmpDate.getHours() + 2);
                        activities.push({
                            activityId: "00000000-0000-0000-0000-000000000000",
                            userId: this.props.store.userID,
                            amount: item.distance,
                            date: tmpDate,
                            type: "getDailyDistanceSamples"
                        });
                    });
                    resolve(activities);
                } else {
                    reject(data);
                }
            });
        }});
    }
    async updateData() {
        try {
            this.setState({ refreshing: true });
            const currUser = await GetUser(this.props.store.userID);

            let startDate = new Date(currUser.lastRecordedDate);
            startDate.setHours(0, 0, 0, 0);

            let endDate = new Date();
            endDate.setHours(23, 59, 59, 999);

            const activities = await this.getDistances(startDate, endDate);
            console.log(activities);
            await activities.forEach(async (activity) => {
                await AddActivity(activity);
            });

            this.props.fitnessActions.setUsers(await GetUsers());
        } catch (error) {
            this.props.baseActions.logError(error);
        }
        this.setState({ refreshing: false });
    }
    async componentDidMount() {
        await this.updateData();
    }
    render() {
        let { users } = this.props.store;
        users = users.map(item => { return { ...item, key: item.userId }; });
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.column}>
                    User: {this.props.store.email}
                </Text>
                <SectionList
                    renderSectionHeader={({ section }) => <Text style={styles.header}>{section.key}</Text>}
                    refreshControl={<RefreshControl onRefresh={this.updateData} refreshing={this.state.refreshing} />}
                    renderItem={(item: IListItem) => (
                        <TouchableOpacity onPress={() => { this.props.baseActions.navigate({ to: Pages.FITNESS_USER, params: item.item }); }}>
                            <View style={styles.itemRow}>
                                <Image style={{ width: 50, height: 50 }} source={{ uri: item.item.avatarUrl }} />
                                <Text style={styles.column}>{item.item.name}</Text>
                                <Text style={styles.column}>{(item.item.totalDistance / 1000).toFixed(2)}km</Text>
                            </View>
                        </TouchableOpacity>
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
        fitnessActions: bindActionCreators(Fitness.Actions.Actions, dispatch),
        baseActions: bindActionCreators(Base.Actions.Actions, dispatch)
    } as IProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(FitnessPage);