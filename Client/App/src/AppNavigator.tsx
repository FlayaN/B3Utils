import React from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator } from "react-navigation";

import { Pages } from "./Constants";
import { MainMenu } from "./pages";

export const AppNavigator = StackNavigator({
    [Pages.MAINMENU]: { screen: MainMenu }
});

interface IProps {
    dispatch: Function;
    nav: Object;
}

interface IState { }

class AppWithNavigationState extends React.Component<IProps, IState> {
    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav })} />
        );
    }
}

const mapStateToProps = (state: StoreDef) => ({
    nav: state.base.navData
});

export default connect(mapStateToProps)(AppWithNavigationState);