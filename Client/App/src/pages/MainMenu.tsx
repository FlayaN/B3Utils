import React from "react";
import { View, Text, StyleSheet, Platform, Button, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import {  } from "../components";
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

// @connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)
class MainMenu extends React.Component<IProps, {}> {
    static navigationOptions = {
        title: "B3Utils"
    };
    render() {
        console.log(this.props.store.avatarUrl);
        return (
            <View style={styles.container}>
                <View>
                    <Button
                        color={"red"} title="Gå till loggen"
                        onPress={() => { this.props.baseActions.navigate(Pages.EVENTLOG); }} />
                </View>
                {Platform.OS === "android" ?
                    <Text style={styles.instructions}>
                        Android
                    </Text> :
                    <Text style={styles.instructions}>
                        IOS
                    </Text>
                }
                {this.props.store.avatarUrl !== "" ?
                    <Image style={{ width: 50, height: 50 }} source={{ uri: this.props.store.avatarUrl }} /> :
                    undefined}
                <Text>{this.props.store.name}</Text>
                <View>
                    <Button
                        disabled={!this.props.store.fitnessInitialized}
                        color={"black"} title="Gå till fitness"
                        onPress={() => { this.props.baseActions.navigate(Pages.FITNESS); }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },

    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 50,
        marginTop: 10
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