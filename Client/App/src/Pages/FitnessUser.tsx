import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
    View,
    Text
    // SectionList,
    // StyleSheet
} from "react-native";

import { Fitness } from "../Modules";

interface IStoreProps {

}

// interface IListItem {
//     index: number;
//     item: IActivityViewModel;
// }

interface IProps {
    store: IStoreProps;
    fitnessActions: Fitness.Actions.ActionsMap;
    navigation: any;
}

class FitnessUser extends React.Component<IProps, {}> {
    static navigationOptions = {
        title: "Fitness"
    };
    constructor(props: IProps) {
        super(props);
        this.updateData = this.updateData.bind(this);
    }
    async updateData() {
        console.log(this.props.navigation);
        // this.props.fitnessActions.setUsers(await GetActivities());
    }
    async componentDidMount() {
        await this.updateData();
    }
    render() {
        return (
            <View>
                <Text>Hejsan</Text>
                {/*<SectionList
                    renderSectionHeader={({ section }) => <Text style={styles.header}>{section.key}</Text>}
                    renderItem={(item: IListItem) => (
                        <View style={styles.itemRow}>
                            <Image style={{ width: 50, height: 50 }} source={{ uri: item.item.avatarUrl }} />
                            <Text style={styles.column}>{item.item.name}</Text>
                            <Text style={styles.column}>{(item.item.totalDistance / 1000).toFixed(2)}km</Text>
                        </View>
                    )}
                    sections={[
                        { data: users, key: "Längst sträcka" }
                    ]} />*/}
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     itemRow: {
//         flexDirection: "row",
//         margin: 10
//     },
//     header: {
//         fontWeight: "bold",
//         fontSize: 18,
//         margin: 10
//     },
//     column: {
//         marginLeft: 10
//     }
// });

function mapStateToProps(state: StoreDef): IProps {
    return {
        store: {
            email: state.user.googleUser.email,
            users: state.fitness.users,
            userID: state.user.googleUser.userID
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(dispatch: any): IProps {
    return Object.assign({ dispatch: dispatch }, {
        fitnessActions: bindActionCreators(Fitness.Actions.Actions, dispatch)
    } as IProps);
}

export default connect(mapStateToProps, mapDispatchToProps)(FitnessUser);