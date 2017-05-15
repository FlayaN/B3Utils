import React from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator, NavigationActions } from "react-navigation";

import { Pages } from "./Constants";
import { MainMenu, TestPage } from "../pages";

import { BackHandler } from "react-native";

export const AppNavigator = StackNavigator({
    [Pages.MAINMENU]: { screen: MainMenu },
    [Pages.TESTPAGE]: { screen: TestPage }
});

interface INavObject {
    index: number;
}

interface IProps {
    dispatch: Function;
    nav: INavObject;
}

interface IState { }

class AppWithNavigationState extends React.Component<IProps, IState> {
    shouldCloseApp(nav: INavObject) {
      return nav.index === 0;
    }
    componentDidMount() {
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

const mapStateToProps = (state: StoreDef) => ({
    nav: state.base.navData
});

export default connect(mapStateToProps)(AppWithNavigationState);