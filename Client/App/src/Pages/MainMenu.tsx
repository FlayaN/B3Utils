import React from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Base } from "../Modules";
import { Pages } from "../Base/Constants";

interface IStoreProps {
    name: string;
    avatarUrl: string;
    fitnessInitialized: boolean;
}

interface IProps {
    store: IStoreProps;
    baseActions: Base.Actions.ActionsMap;
}

class MainMenu extends React.Component<IProps, {}> {
    render() {
        return (
            <View style={styles.root}>
                <View style={styles.healthContainer}>
                    <TouchableOpacity
                        style={styles.healthButton}
                        disabled={!this.props.store.fitnessInitialized}
                        onPress={() => { this.props.baseActions.navigate({ to: Pages.FITNESS }); }} >
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Hälsa</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                    {this.props.store.avatarUrl !== "" ?
                        <Image style={{ width: 70, height: 70 }} source={{ uri: this.props.store.avatarUrl }} /> :
                        undefined}
                    <Text style={{ fontSize: 25, fontWeight: "bold" }}>{this.props.store.name}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    healthButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    healthContainer: {
        flex: 1,
        backgroundColor: "skyblue"
    },
    root: {
        flex: 1
    }
});

function mapStateToProps(state: StoreDef): IProps {
    return {
        store: {
            name: state.user.googleUser.name,
            avatarUrl: state.user.avatarUrl,
            fitnessInitialized: state.fitness.initialized
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(dispatch: any): IProps {
    return {
        baseActions: bindActionCreators(Base.Actions.Actions, dispatch)
    } as IProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);