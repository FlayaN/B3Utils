import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationProp, NavigationRoute } from "react-navigation";
import { GetActivities } from "../Base/Utilities";

import {
    View,
    Text,
    SectionList,
    StyleSheet
} from "react-native";

import dateFormat from "dateformat";

import { Fitness } from "../Modules";

interface IStoreProps {
    activities: IActivityViewModel[];
}

interface IListItem {
    index: number;
    item: IActivityViewModel;
}

interface IProps {
    store: IStoreProps;
    fitnessActions: Fitness.Actions.ActionsMap;
    navigation: NavigationProp<NavigationRoute<IUserViewModel>, any>;
}

class FitnessUser extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.updateData = this.updateData.bind(this);
    }
    async updateData() {
        const userId = this.props.navigation.state.params.userId;
        const activities = await GetActivities(userId);
        this.props.fitnessActions.setUserActivities({ userId: userId, activities: activities });
    }
    async componentDidMount() {
        await this.updateData();
    }
    render() {
        let { activities } = this.props.store;
        if (activities !== undefined) {
            activities = activities.map(item => { return { ...item, key: item.activityId }; });
        }
        return (
            <View>
                {this.props.store.activities &&
                    <SectionList
                        renderSectionHeader={({ section }) => <Text style={styles.header}>{section.key}</Text>}
                        renderItem={(item: IListItem) => (
                            <View style={styles.itemRow}>
                                <Text style={styles.column}>{dateFormat(item.item.date, "yyyy-mm-dd dddd")}</Text>
                                <Text style={styles.column}>{(item.item.amount / 1000).toFixed(2)}km</Text>
                            </View>
                        )}
                        sections={[
                            { data: activities, key: "Senast" }
                        ]} />
                }
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

function mapStateToProps(state: StoreDef, ownProps: IProps): IProps {
    return {
        store: {
            email: state.user.googleUser.email,
            users: state.fitness.users,
            userID: state.user.googleUser.userID,
            activities: state.fitness.activitiesData[ownProps.navigation.state.params.userId]
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(dispatch: any): IProps {
    return Object.assign({ dispatch: dispatch }, {
        fitnessActions: bindActionCreators(Fitness.Actions.Actions, dispatch)
    } as IProps);
}

export default connect(mapStateToProps, mapDispatchToProps)(FitnessUser);