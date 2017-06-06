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
    Platform,
    ViewStyle,
    TextStyle,
    ImageStyle
} from "react-native";

import { Fitness, Base } from "../../Modules";
import { GetUsers, GetUser, AddActivity, getDailyDistance, getDailySteps, GetAwards } from "../../Base/Utilities";
import { Pages } from "../../Base/Constants";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AppleHealthKit from "react-native-apple-healthkit-rn0.40";
import GoogleFit from "react-native-google-fit";
import { FitnessIcon, FitnessFilter, AwardIcons } from "../../Components";
import { baseStyles } from "../../Base/Styles";

interface IStoreProps {
    email: string;
    users: UserViewModel[];
    userID: string;
    fitnessMode: FitnessType;
    filterMode: FilterType;
    awards: AwardViewModel[];
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
        this.initGoogleFit = this.initGoogleFit.bind(this);
        this.initAppleHealth = this.initAppleHealth.bind(this);
        this.state = {
            refreshing: false
        };
    }
    async initGoogleFit() {
        await GoogleFit.authorizeFit();
        await GoogleFit.onAuthorize((result) => {
            this.props.baseActions.logInfo(`GoogleFit.onAuthorize: ${JSON.stringify(result)}`);
        });
    }
    async initAppleHealth() {
        const HKTYPE = AppleHealthKit.Constants.Permissions;

        const options = {
            permissions: {
                read: [HKTYPE.StepCount, HKTYPE.DistanceWalkingRunning],
                write: []
            }
        };

        return new Promise((resolve, reject) => {
            AppleHealthKit.initHealthKit(options, (err, res) => {
                if (err) {
                    reject(err);
                    this.props.baseActions.logError(`AppleHealthKit.initHealthKit: ${JSON.stringify(res)}`);
                    return;
                }
                resolve(res);
                this.props.baseActions.logInfo(JSON.stringify(res));
            });
        });
    }

    async updateData(type: FitnessType, filter: FilterType) {
        try {
            this.setState({ refreshing: true });
            this.props.fitnessActions.setUsers([]);
            this.props.fitnessActions.setAwards([]);

            if (Platform.OS === "ios") {
                await this.initAppleHealth();
            } else {
                await this.initGoogleFit();
            }

            const currUser = await GetUser(this.props.store.userID);

            let startDate = new Date(currUser.lastRecordedDate);
            startDate.setDate(startDate.getDate() - 2);
            startDate.setHours(0, 0, 0, 0);

            let endDate = new Date();
            endDate.setHours(23, 59, 59, 999);

            let activities: ActivityViewModel[] = [];

            try {
                activities = activities.concat(await getDailyDistance(startDate, endDate, this.props.store.userID));
            } catch (error) {
                this.props.baseActions.logError(JSON.stringify(error));
            }
            try {
                activities = activities.concat(await getDailySteps(startDate, endDate, this.props.store.userID));
            } catch (error) {
                this.props.baseActions.logError(error);
            }

            await activities.forEach(async (activity) => {
                await AddActivity(activity);
            });
            this.props.fitnessActions.setUsers(await GetUsers(type, filter));
            if (filter === FilterType.All) {

                let awards = await GetAwards(type, FilterType.Week);
                awards = awards.concat(await GetAwards(type, FilterType.Month));

                this.props.fitnessActions.setAwards(awards);
            } else {
                this.props.fitnessActions.setAwards(await GetAwards(type, filter));
            }
        } catch (error) {
            this.props.baseActions.logError(error);
        }
        this.setState({ refreshing: false });
    }
    async componentDidMount() {
        const { fitnessMode, filterMode } = this.props.store;
        await this.updateData(fitnessMode, filterMode);
    }
    async componentDidUpdate(prevProps: IProps) {
        const { fitnessMode, filterMode } = this.props.store;
        if (prevProps.store.filterMode !== filterMode || prevProps.store.fitnessMode !== fitnessMode) {
            await this.updateData(fitnessMode, filterMode);
        }
    }
    render() {
        const { users, fitnessMode, filterMode, awards } = this.props.store;
        return (
            <View style={styles.root}>
                <FitnessFilter onChange={this.updateData} />
                <SectionList
                    renderSectionHeader={({ section }) => <Text style={baseStyles.header}>{section.key}</Text>}
                    keyExtractor={(x: ActivityViewModel) => x.userId}
                    refreshControl={(
                        <RefreshControl
                            onRefresh={() => this.updateData(fitnessMode, filterMode)}
                            refreshing={this.state.refreshing} />
                    )}
                    renderItem={({ item, index }: { item: UserViewModel, index: number }) => (
                        <TouchableOpacity onPress={() => { this.props.baseActions.navigate({ to: Pages.FITNESS_USER, params: item }); }}>
                            <View style={baseStyles.itemRow}>
                                <Image style={styles.avatar} source={{ uri: item.avatarUrl }} />
                                {index === 0 && <MCIcon style={styles.crown} size={30} color="gold" name="crown" />}
                                <Text style={baseStyles.column}>{item.name}</Text>
                                <AwardIcons awards={awards.filter((award: AwardViewModel) => award.userId === item.userId)} />
                                <FitnessIcon fitnessMode={fitnessMode} amount={item.amount} />
                            </View>
                        </TouchableOpacity>
                    )}
                    sections={[
                        { data: users, key: fitnessMode === FitnessType.Distance ? "Sträcka" : "Steg" }
                    ]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    crown: {
        position: "absolute",
        marginLeft: 10,
        top: -15,
        backgroundColor: "transparent"
    } as TextStyle,
    avatar: {
        width: 50,
        height: 50
    } as ImageStyle,
    modePicker: {
        width: 100,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flex: 1
    } as ViewStyle,
    filterPicker: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flex: 1.5
    } as ViewStyle,
    root: {
        flex: 1
    } as ViewStyle
});

function mapStateToProps(state: StoreDef): IProps {
    return {
        store: {
            email: state.user.googleUser.email,
            users: state.fitness.users,
            userID: state.user.googleUser.userID,
            fitnessMode: state.fitness.selectedFitnessMode,
            filterMode: state.fitness.selectedFilterMode,
            awards: state.fitness.awards
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