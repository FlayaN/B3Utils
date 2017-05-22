import React from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator, NavigationActions } from "react-navigation";

import { Pages } from "./Constants";
import { MainMenu, Fitness as FitnessPage, EventLog, FitnessUser } from "../Pages";
import { User, Fitness, Base } from "../Modules";
import { bindActionCreators } from "redux";

import {
    BackHandler,
    Platform
} from "react-native";

import { LoginWithGoogle, AddUser } from "./Utilities";

export const AppNavigator = StackNavigator({
    [Pages.MAINMENU]: { screen: MainMenu },
    [Pages.FITNESS]: { screen: FitnessPage },
    [Pages.EVENTLOG]: { screen: EventLog },
    [Pages.FITNESS_USER]: {
        screen: FitnessUser,
        path: "fitness/:id"
    }
});

import GoogleFit from "react-native-google-fit";
import AppleHealthKit from "react-native-apple-healthkit";

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
        this.initGoogleFit = this.initGoogleFit.bind(this);
        this.initAppleHealth = this.initAppleHealth.bind(this);
    }
    shouldCloseApp(nav: INavObject) {
        return nav.index === 0;
    }
    async initGoogleFit() {
        await GoogleFit.authorizeFit();
        await GoogleFit.onAuthorize((result) => {
            this.props.baseActions.logInfo(`GoogleFit.onAuthorize: ${JSON.stringify(result)}`);
        });

        await GoogleFit.observeSteps((step) => {
            this.props.baseActions.logInfo(`GoogleFit.observeSteps: ${JSON.stringify(step)}`);
        });
    }
    initAppleHealth() {
        const options = {
            permissions: {
                read: ["StepCount"],
                write: ["StepCount"]
            }
        };

        return new Promise((resolve, reject) => {
            AppleHealthKit.initHealthKit(options, (err, res) => {
                if(err) {
                    reject(err);
                    this.props.baseActions.logError(`AppleHealthKit.initHealthKit: ${JSON.stringify(res)}`);
                    return;
                }
                resolve(res);
            });
        });
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
                this.props.baseActions.logError(`Image json: ${imageError}`);
                imageUrl = user.photoUrlTiny;
            }
            this.props.userActions.setAvatar(imageUrl);
            await AddUser({
                name: user.name,
                avatarUrl: imageUrl,
                lastRecordedDate: new Date().toISOString(),
                userId: user.userID,
                totalDistance: 0
            });
            if(Platform.OS === "ios") {
                await this.initAppleHealth();
            }
            else {
                await this.initGoogleFit();
            }
        } catch (error) {
            this.props.baseActions.logError(`Error: ${error}`);
        }
        this.props.fitnessActions.setInitialized(true);

        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    componentWillUnmount() {
        GoogleFit.usubscribeListeners();
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
    return Object.assign({ dispatch: dispatch }, {
        userActions: bindActionCreators(User.Actions.Actions, dispatch),
        fitnessActions: bindActionCreators(Fitness.Actions.Actions, dispatch),
        baseActions: bindActionCreators(Base.Actions.Actions, dispatch)
    } as IProps);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);