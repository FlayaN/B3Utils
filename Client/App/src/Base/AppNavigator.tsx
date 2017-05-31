import React from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import {
    BackHandler
} from "react-native";
import { bindActionCreators } from "redux";

import { StackNav } from "./Router";
import { User, Fitness, Base } from "../Modules";
import { LoginWithGoogle, AddUser } from "./Utilities";

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
    fitnessActions: Fitness.Actions.ActionsMap;
    baseActions: Base.Actions.ActionsMap;
}

interface IState { }

class AppWithNavigationState extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    shouldCloseApp(nav: INavObject) {
        return nav.index === 0;
    }

    async componentDidMount() {
        try {
            const user = await LoginWithGoogle();
            this.props.baseActions.logInfo(`User: ${JSON.stringify(user)}`);
            this.props.userActions.setGoogleUser(user);
            let imageUrl = "";
            try {
                const apiKey = "AIzaSyAPZSjHiCrZWnribMptYujn2UROI-vIku4";
                const response = await fetch(`https://www.googleapis.com/plus/v1/people/${this.props.store.userID}?fields=image&key=${apiKey}`);
                const responseJson = await response.json();
                this.props.baseActions.logInfo(`Image json: ${JSON.stringify(responseJson)}`);
                imageUrl = responseJson.image.url;
            } catch (imageError) {
                this.props.baseActions.logError(`Image error: ${imageError}`);
                imageUrl = user.photoUrlTiny;
            }
            this.props.userActions.setAvatar(imageUrl);
            const response = await AddUser({
                name: user.name,
                avatarUrl: imageUrl,
                lastRecordedDate: new Date().toISOString(),
                userId: user.userID,
                totalDistance: 0,
                totalSteps: 0
            });
            this.props.baseActions.logInfo(JSON.stringify(response));
            
        } catch (error) {
            this.props.baseActions.logError(`Error: ${error}`);
        }
        this.props.fitnessActions.setInitialized(true);

        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    componentWillUnmount() {
        // BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
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
            <StackNav navigation={addNavigationHelpers({ dispatch, state: nav })} />
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
    return Object.assign({ dispatch: dispatch }, {
        userActions: bindActionCreators(User.Actions.Actions, dispatch),
        fitnessActions: bindActionCreators(Fitness.Actions.Actions, dispatch),
        baseActions: bindActionCreators(Base.Actions.Actions, dispatch)
    } as IProps);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);