import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationProp, NavigationRoute } from "react-navigation";
import dateFormat from "dateformat";
import {
    View,
    Text,
    SectionList,
    StyleSheet
} from "react-native";

import { GetActivities } from "../Base/Utilities";
import { Fitness } from "../Modules";
import { FitnessIcon, FitnessFilter } from "../Components";

interface IStoreProps {
    activities: ActivityViewModel[];
    fitnessMode: FitnessType;
    filterMode: FilterType;
    awards: AwardViewModel[];
}

interface IProps {
    store: IStoreProps;
    fitnessActions: Fitness.Actions.ActionsMap;
    navigation: NavigationProp<NavigationRoute<UserViewModel>, any>;
}

class FitnessUser extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.updateData = this.updateData.bind(this);
    }
    async updateData(fitnessMode: FitnessType, filterMode: FilterType) {
        const userId = this.props.navigation.state.params.userId;
        const activities = await GetActivities(userId, fitnessMode, filterMode);
        this.props.fitnessActions.setUserActivities({ userId: userId, activities: activities });
    }
    async componentDidMount() {
        const { fitnessMode, filterMode } = this.props.store;
        await this.updateData(fitnessMode, filterMode);
    }
    render() {
        let { activities, fitnessMode, awards } = this.props.store;

        if (activities === undefined || awards === undefined) {
            // tslint:disable-next-line:no-null-keyword
            return null; // Todo investigate if you can use undefined
        }
        return (
            <View>
                <FitnessFilter onChange={this.updateData} />
                <SectionList
                    renderSectionHeader={({ section }) => section.data.length > 0 && <Text style={styles.header}>{section.key}</Text>}
                    keyExtractor={(item: ActivityViewModel & AwardViewModel) => item.activityId || item.date}
                    sections={[
                        {
                            data: awards,
                            renderItem: ({ item }: { item: AwardViewModel }) => (
                                <View style={styles.itemRow}>
                                    <Text style={styles.column}>{item.description}</Text>
                                    <FitnessIcon fitnessMode={fitnessMode} amount={Number(item.value)} />
                                </View>),
                            key: "Utmärkelser"
                        },
                        {
                            data: activities,
                                renderItem: ({ item }: { item: ActivityViewModel }) => (
                                <View style={styles.itemRow}>
                                    <Text style={styles.column}>{dateFormat(item.date, "yyyy-mm-dd dddd")}</Text>
                                    <FitnessIcon fitnessMode={fitnessMode} amount={item.amount} />
                                </View>
                            ),
                            key: "Senast"
                        }
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
        marginLeft: 10,
        flex: 1
    }
});

function mapStateToProps(state: StoreDef, ownProps: IProps): IProps {
    return {
        store: {
            activities: state.fitness.activitiesData[ownProps.navigation.state.params.userId],
            fitnessMode: state.fitness.selectedFitnessMode,
            filterMode: state.fitness.selectedFilterMode,
            awards: state.fitness.awards.filter(x => x.userId === ownProps.navigation.state.params.userId)
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(dispatch: any): IProps {
    return Object.assign({ dispatch: dispatch }, {
        fitnessActions: bindActionCreators(Fitness.Actions.Actions, dispatch)
    } as IProps);
}

export default connect(mapStateToProps, mapDispatchToProps)(FitnessUser);