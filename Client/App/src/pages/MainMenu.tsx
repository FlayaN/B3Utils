import React from "react";
import { View, Text, StyleSheet, Platform, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import {  } from "../components";
import { User, Base } from "../modules";
import { Pages } from "../Base/Constants";

interface IStoreProps {
    UserName: string;
}

interface IProps {
    store: IStoreProps;
    userActions: User.Actions.ActionsMap;
    baseActions: Base.Actions.ActionsMap;
}

// @connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)
class MainMenu extends React.Component<IProps, {}> {
    static navigationOptions = {
        title: "Main menu"
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    B3Utils
                </Text>
                {/*<Button title="Play" onPress={Actions[Pages.GAME]} />*/}
                {Platform.OS === "android" ?
                    <Text style={styles.instructions}>
                        Android
                    </Text> :
                    <Text style={styles.instructions}>
                        IOS
                    </Text>
                }
                <View style={styles.reduxButtons}>
                    <View style={styles.firstButton}>
                        <Button color={"red"} title="Test redux! User1" onPress={() => { this.props.userActions.setName("User1"); } } />
                    </View>
                    <View>
                        <Button color={"green"} title="Test redux! User2" onPress={() => { this.props.userActions.setName("User2"); } } />
                    </View>
                </View>
                <Text>{this.props.store.UserName}</Text>
                <View>
                    <Button color={"black"} title="Go to TestPage" onPress={() => { this.props.baseActions.navigate(Pages.TESTPAGE); } } />
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

    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },

    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 50,
        marginTop: 10
    },

    reduxButtons: {
        flexDirection: "row",
        marginBottom: 10
    },

    firstButton: {
        marginRight: 10
    }
});

function mapStateToProps(state: StoreDef): IProps {
    return {
        store: {
            UserName: state.user.name
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(dispatch: any): IProps {
    return {
        userActions: bindActionCreators(User.Actions.Actions, dispatch),
        baseActions: bindActionCreators(Base.Actions.Actions, dispatch)
    } as IProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);