import { StackNavigator, TabNavigator, TabNavigatorConfig } from "react-navigation";
import { connect } from "react-redux";
import { Pages } from "./Constants";
import {
    MainMenu,
    Fitness,
    EventLog,
    FitnessUser,
    Profile
} from "../Pages";
import AppWithNavigationState from "./AppNavigator";

export const StackNav = StackNavigator({
    [Pages.MAINMENU]: {
        screen: MainMenu,
        navigationOptions: {
            title: "Start"
        }
    },
    [Pages.FITNESS]: {
        screen: Fitness,
        navigationOptions: {
            title: "Hälsa"
        }
    },
    [Pages.FITNESS_USER]: {
        screen: FitnessUser,
        navigationOptions: ({ navigation }) => ({
            title: `Aktiviteter för ${navigation.state.params.name}`
        })
    }
});

export const TabNav = connect()(TabNavigator({
    B3Utils: {
        screen: AppWithNavigationState
    },
    Logg: {
        screen: EventLog
    } as TabNavigatorConfig,
    Profil: {
        screen: Profile
    }
}));