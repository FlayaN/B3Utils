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
    RefreshControl
} from "react-native";

import { Fitness, Base } from "../Modules";
import { GetUsers, GetUser, AddActivity, addHours, getDailyDistance, getDailySteps } from "../Base/Utilities";
import { Pages } from "../Base/Constants";
import { SegmentedControls } from "react-native-radio-buttons";

interface IStoreProps {
    email: string;
    users: IUserViewModel[];
    userID: string;
    fitnessMode: string;
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
        this.state = {
            refreshing: false
        };
    }
    async updateData(type) {
        try {
            this.setState({ refreshing: true });
            const currUser = await GetUser(this.props.store.userID);

            let startDate = new Date(currUser.lastRecordedDate);
            startDate.setHours(2, 0, 0, 0);

            let endDate = new Date();
            endDate.setHours(23, 59, 59, 999);
            endDate = addHours(endDate, 2);

            let activities = await getDailyDistance(startDate, endDate, this.props.store.userID);
            activities = activities.concat(await getDailySteps(startDate, endDate, this.props.store.userID));
            await activities.forEach(async (activity) => {
                await AddActivity(activity);
            });
            const correctType = type === "Steg" ? "getDailyStepCountSamples" : "getDailyDistanceSamples";
            this.props.fitnessActions.setUsers(await GetUsers(correctType));
        } catch (error) {
            this.props.baseActions.logError(error);
        }
        this.setState({ refreshing: false });
    }
    async componentDidMount() {
        await this.updateData(this.props.store.fitnessMode);
    }
    renderOption(option, selected) {
        const style = selected ? { fontWeight: "bold", textAlign: "center" } : { textAlign: "center" };
        return (
            <Text style={style as any}>{option}</Text>
        );
    }
    async setSelectedOption(selectedOption) {
        this.props.fitnessActions.setSelectedFitnessMode(selectedOption);
        await this.updateData(selectedOption);
    }
    render() {
        let { users } = this.props.store;
        users = users.map(item => { return { ...item, key: item.userId }; });
        return (
            <View style={{ flex: 1 }}>
                <SegmentedControls style={styles.itemRow} options={["Avstånd", "Steg"]}
                    onSelection={this.setSelectedOption.bind(this)}
                    selectedOption={this.props.store.fitnessMode}
                    renderOption={this.renderOption}
                    renderContainer={(optionNodes) => <View>{optionNodes}</View>} />
                <SectionList
                    renderSectionHeader={({ section }) => <Text style={styles.header}>{section.key}</Text>}
                    refreshControl={<RefreshControl
                        onRefresh={() => { this.updateData(this.props.store.fitnessMode); }}
                        refreshing={this.state.refreshing} />}
                    renderItem={(item: IListItem) => (
                        <TouchableOpacity onPress={() => { this.props.baseActions.navigate({ to: Pages.FITNESS_USER, params: item.item }); }}>
                            <View style={styles.itemRow}>
                                <Image style={{ width: 50, height: 50 }} source={{ uri: item.item.avatarUrl }} />
                                <Text style={styles.column}>{item.item.name}</Text>
                                {this.props.store.fitnessMode === "Avstånd" ?
                                    <Text style={styles.column}>{(item.item.totalDistance / 1000).toFixed(2)}km</Text> :
                                    <Text style={styles.column}>{item.item.totalSteps}</Text>}
                            </View>
                        </TouchableOpacity>
                    )}
                    sections={[
                        { data: users, key: this.props.store.fitnessMode }
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
            userID: state.user.googleUser.userID,
            fitnessMode: state.fitness.selectedFitnessMode
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