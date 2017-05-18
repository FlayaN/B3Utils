import React from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator, NavigationActions } from "react-navigation";

import { Pages } from "./Constants";
import { MainMenu, TestPage } from "../pages";
import { User } from "../modules";
import { bindActionCreators } from "redux";

import { BackHandler } from "react-native";

import { LoginWithGoogle } from "./Utilities";

export const AppNavigator = StackNavigator({
    [Pages.MAINMENU]: { screen: MainMenu },
    [Pages.TESTPAGE]: { screen: TestPage }
});

interface INavObject {
    index: number;
}

interface IStoreProps {
    userID: string;
}

interface IProps {
    store: IStoreProps;
    dispatch: Function;
    nav: INavObject;
    userActions: User.Actions.ActionsMap;
}

interface IState { }

class AppWithNavigationState extends React.Component<IProps, IState> {
    shouldCloseApp(nav: INavObject) {
        return nav.index === 0;
    }
    async componentDidMount() {

        const user = await LoginWithGoogle();
        this.props.userActions.setGoogleUser(user);

        const apiKey = "AIzaSyAPZSjHiCrZWnribMptYujn2UROI-vIku4";

        const response = await fetch(`https://www.googleapis.com/plus/v1/people/${this.props.store.userID}?fields=image&key=${apiKey}`);
        const responseJson = await response.json();
        console.log(responseJson);

        this.props.userActions.setAvatar(responseJson.image.url);
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (this.shouldCloseApp(nav)) {
            return false;
        }
        dispatch(NavigationActions.back({}));
        return true;
    }
    render() {
        const { dispatch, nav } = this.props;
        return (
            <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
        );
    }
}

function mapStateToProps(state: StoreDef): IProps {
    return {
        nav: state.base.navData,
        store: {
            userID: state.user.googleUser.userID
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(dispatch: any): IProps {
    return {
        userActions: bindActionCreators(User.Actions.Actions, dispatch)
    } as IProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);